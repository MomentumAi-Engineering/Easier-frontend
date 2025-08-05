import google.generativeai as genai
from PIL import Image
import io
import json
import logging
from dotenv import load_dotenv
import os
from datetime import datetime
import pytz
import re
from pathlib import Path
from utils.timezone import get_timezone_name
from utils.location import get_authority_by_zip_code, get_authority
from typing import Optional, Dict, Any

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    logger.error("GEMINI_API_KEY is not set in environment variables")
    raise ValueError("GEMINI_API_KEY is not set")

genai.configure(api_key=GEMINI_API_KEY)

def load_json_data(file_name: str) -> dict:
    """Load JSON data from a file."""
    try:
        file_path = Path(__file__).parent.parent / "data" / file_name
        with open(file_path, "r") as file:
            data = json.load(file)
        logger.debug(f"Loaded JSON data from {file_path}")
        return data
    except FileNotFoundError:
        logger.error(f"JSON file {file_path} not found")
        return {}
    except json.JSONDecodeError as e:
        logger.error(f"Failed to decode JSON from {file_path}: {str(e)}")
        return {}

def classify_issue(image_content: bytes, description: str) -> tuple[str, str, float, str, str]:
    try:
        image = Image.open(io.BytesIO(image_content))
        model = genai.GenerativeModel("gemini-1.5-flash")
        prompt = f"""
You are an expert AI trained to classify infrastructure-related issues based on an image and text description.
Analyze the image and description: "{description}".
Return JSON with:
{{
  "issue_type": "fire|pothole|garbage|property_damage|flood|vandalism|structural_damage|unknown",
  "confidence": number (0 to 100)
}}
Ensure the issue_type matches one of the specified options. For descriptions mentioning size (e.g., "2 ft wide") or safety risks (e.g., "cause cars to swerve"), prioritize "pothole" with high confidence. Provide only valid JSON without explanation.
"""
        response = model.generate_content([prompt, image, f"Description: {description}"])
        logger.info(f"Gemini classification raw output: {response.text}")
        parsed = json.loads(response.text[response.text.find("{"):response.text.rfind("}")+1])
        issue_type = parsed.get("issue_type", "unknown").lower()
        confidence = float(parsed.get("confidence", 70.0))
        
        # Cross-validate with description
        description_lower = description.lower()
        issue_keywords = {
            "fire": ["fire", "smoke", "flame", "burn", "blaze"],
            "pothole": ["pothole", "road damage", "crack", "hole", "ft wide", "deep", "swerve"],
            "garbage": ["trash", "litter", "garbage", "debris", "waste"],
            "property_damage": ["damage", "broken", "destruction"],
            "flood": ["flood", "water", "inundation", "leak"],
            "vandalism": ["graffiti", "vandalism", "deface", "tagging"],
            "structural_damage": ["crack", "collapse", "structural", "foundation"]
        }
        
        for issue, keywords in issue_keywords.items():
            if any(keyword in description_lower for keyword in keywords):
                issue_type = issue
                confidence = max(confidence, 92.0 if issue == "pothole" else 80.0)
                logger.info(f"Description suggests {issue}. Overriding to {issue} with confidence {confidence}.")
                break
        
        # Cap confidence at 100
        confidence = min(confidence, 100.0)
        
        # Severity logic
        high_severity_issues = ["fire", "flood", "structural_damage"]
        high_severity_keywords = ["urgent", "emergency", "critical", "severe"]
        medium_severity_issues = ["pothole", "vandalism"]
        severity = (
            "High" if issue_type in high_severity_issues or any(k in description_lower for k in high_severity_keywords)
            else "Medium" if issue_type in medium_severity_issues or confidence >= 85
            else "Low"
        )
        
        # Load category from JSON
        issue_category_map = load_json_data("issue_category_map.json")
        category = issue_category_map.get(issue_type, "public")
        priority = "High" if severity == "High" or confidence > 90 else "Medium"
        
        logger.info(f"Issue classified as {issue_type} with severity {severity} (confidence: {confidence})")
        return issue_type, severity, confidence, category, priority
    except Exception as e:
        logger.error(f"Error classifying issue: {e}")
        return "unknown", "Medium", 50.0, "public", "Medium"

def generate_report(
    image_content: bytes,
    description: str,
    issue_type: str,
    severity: str,
    address: str,
    zip_code: Optional[str],
    latitude: float,
    longitude: float,
    issue_id: str,
    confidence: float,
    category: str,
    priority: str,
    decline_reason: Optional[str] = None
) -> Dict[str, Any]:
    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        location_str = (
            f"{address}, {zip_code}" if address and address.lower() != "not specified" and zip_code
            else address if address and address.lower() != "not specified"
            else f"Coordinates: {latitude}, {longitude}" if latitude and longitude
            else "Unknown Location"
        )
        
        # Load department from JSON
        issue_department_map = load_json_data("issue_department_map.json")
        department = issue_department_map.get(issue_type, ["general"])[0] if issue_department_map.get(issue_type) else "general"
        map_link = f"https://www.google.com/maps?q={latitude},{longitude}" if latitude and longitude else "Coordinates unavailable"
        
        # Get authority data
        authority_data = get_authority_by_zip_code(zip_code, issue_type, category) if zip_code else get_authority(address, issue_type, latitude, longitude, category)
        responsible_authorities = authority_data.get("responsible_authorities", [{"name": department, "email": "chrishabh1000@gmail.com", "type": "general", "timezone": "UTC"}])
        available_authorities = authority_data.get("available_authorities", [{"name": "City Department", "email": "chrishabh1000@gmail.com", "type": "general", "timezone": "UTC"}])
        
        # Check if available_authorities contains a message
        if available_authorities and "message" in available_authorities[0]:
            available_authorities = [{"name": "City Department", "email": "chrishabh1000@gmail.com", "type": "general", "timezone": "UTC"}]
        
        # Get the correct timezone based on coordinates
        timezone_str = get_timezone_name(latitude, longitude) or "UTC"
        timezone = pytz.timezone(timezone_str)
        now = datetime.now(timezone)
        local_time = now.strftime("%Y-%m-%d %H:%M")
        utc_time = now.astimezone(pytz.UTC).strftime("%H:%M")
        report_number = str(int(now.strftime("%Y%m%d%H%M%S")) % 1000000).zfill(6)
        report_id = f"SNAPFIX-{now.year}-{report_number}"
        image_filename = f"IMG1_{now.strftime('%Y%m%d_%H%M')}.jpg"
        
        # Include decline_reason and zip_code in prompt if provided
        decline_prompt = f"- Decline Reason: {decline_reason}\n" if decline_reason else ""
        zip_code_prompt = f"- Zip Code: {zip_code}\n" if zip_code else ""
        
        prompt = f"""
You are an AI assistant for SnapFix AI, generating infrastructure issue reports.
Analyze the input below and return a structured JSON report (no markdown, no explanation).
Input:
- Issue Type: {issue_type.title()}
- Severity: {severity}
- Confidence: {confidence:.1f}%
- Description: {description}
- Category: {category}
- Location: {location_str}
- Issue ID: {issue_id}
- Responsible Department: {department}
- Map Link: {map_link}
- Priority: {priority}
{decline_prompt}
{zip_code_prompt}

For recommended_actions, provide 2-3 specific, actionable steps with timeframes. Examples:
- Potholes: ["Fill pothole and mark with cones within 48 hours.", "Conduct follow-up inspection after repair."]
- Fire: ["Dispatch fire department immediately.", "Evacuate area if necessary.", "Investigate cause after extinguishing."]
- Garbage: ["Remove debris within 24 hours.", "Install additional trash bins in the area."]
- Flooding: ["Deploy pumps and sandbags immediately.", "Clear drainage systems within 12 hours."]
- Vandalism: ["Remove graffiti within 72 hours.", "Repair damaged property.", "Increase security patrols."]
- Structural damage: ["Cordon off the area immediately.", "Conduct structural inspection within 24 hours.", "Repair or reinforce structure as needed."]
- Property damage: ["Assess extent of damage.", "Contact property owner within 24 hours.", "Arrange repairs within 48 hours."]
Tailor the actions to the specific issue type and context.

If a decline reason is provided, incorporate it into the summary_explanation and add a feedback field in detailed_analysis.
Include the zip code in the summary_explanation if provided.

Return this structure:
{{
  "issue_overview": {{
    "issue_type": "{issue_type.title()}",
    "severity": "{severity.lower()}",
    "confidence": {confidence},
    "category": "{category}",
    "summary_explanation": "Write a 4 to 5 line detailed explanation based on the provided image and description. Mention what visual elements helped identify the issue, how the description supported the classification, and specify the location clearly (include zip code if provided). If a decline reason is provided, include it. The tone should be professional and focused on public infrastructure impact."
  }},
  "detailed_analysis": {{
    "root_causes": "Possible causes of the issue.",
    "potential_consequences_if_ignored": "Risks if the issue is not addressed.",
    "public_safety_risk": "low|medium|high",
    "environmental_impact": "low|medium|high|none",
    "structural_implications": "low|medium|high|none",
    "legal_or_regulatory_considerations": "Relevant regulations or null",
    "feedback": "User-provided decline reason: {decline_reason}" if decline_reason else null
  }},
  "recommended_actions": ["Action 1", "Action 2"],
  "responsible_authorities_or_parties": {json.dumps(responsible_authorities)},
  "available_authorities": {json.dumps(available_authorities)},
  "additional_notes": "Location: {location_str}. View live location: {map_link}. Issue ID: {issue_id}. Track report: https://momentum-ai.org/track/{report_id}. Zip Code: {zip_code if zip_code else 'N/A'}.",
  "template_fields": {{
    "oid": "{report_id}",
    "timestamp": "{local_time}",
    "utc_time": "{utc_time}",
    "priority": "{priority}",
    "tracking_link": "https://momentum-ai.org/track/{report_id}",
    "image_filename": "{image_filename}",
    "ai_tag": "{issue_type.title()}",
    "app_version": "1.5.3",
    "device_type": "Mobile (Generic)",
    "map_link": "{map_link}",
    "zip_code": "{zip_code if zip_code else 'N/A'}"
  }}
}}
Keep the report under 200 words, professional, and specific to the issue type and description.
"""
        response = model.generate_content([prompt, Image.open(io.BytesIO(image_content))])
        logger.info(f"Gemini report output: {response.text}")
        json_text = response.text[response.text.find("{"):response.text.rfind("}") + 1]
        report = json.loads(json_text)
        report["additional_notes"] = f"Location: {location_str}. View live location: {map_link}. Issue ID: {issue_id}. Track report: https://momentum-ai.org/track/{report_id}. Zip Code: {zip_code if zip_code else 'N/A'}."
        report["template_fields"]["map_link"] = map_link
        report["template_fields"]["zip_code"] = zip_code if zip_code else "N/A"
        report["responsible_authorities_or_parties"] = responsible_authorities
        report["available_authorities"] = available_authorities
        return report
    except Exception as e:
        logger.error(f"Error generating report: {e}")
        timezone_str = get_timezone_name(latitude, longitude) or "UTC"
        timezone = pytz.timezone(timezone_str)
        now = datetime.now(timezone)
        local_time = now.strftime("%Y-%m-%d %H:%M")
        utc_time = now.astimezone(pytz.UTC).strftime("%H:%M")
        report_number = str(int(now.strftime("%Y%m%d%H%M%S")) % 1000000).zfill(6)
        report_id = f"SNAPFIX-{now.year}-{report_number}"
        image_filename = f"IMG1_{now.strftime('%Y%m%d_%H%M')}.jpg"
        map_link = f"https://www.google.com/maps?q={latitude},{longitude}" if latitude and longitude else "Coordinates unavailable"
        location_str = (
            f"{address}, {zip_code}" if address and address.lower() != "not specified" and zip_code
            else address if address and address.lower() != "not specified"
            else f"Coordinates: {latitude}, {longitude}" if latitude and longitude
            else "Unknown Location"
        )
        
        # Get authority data for fallback
        authority_data = get_authority_by_zip_code(zip_code, issue_type, category) if zip_code else get_authority(address, issue_type, latitude, longitude, category)
        responsible_authorities = authority_data.get("responsible_authorities", [{"name": department, "email": "chrishabh1000@gmail.com", "type": "general", "timezone": "UTC"}])
        available_authorities = authority_data.get("available_authorities", [{"name": "City Department", "email": "chrishabh1000@gmail.com", "type": "general", "timezone": "UTC"}])
        
        # Check if available_authorities contains a message
        if available_authorities and "message" in available_authorities[0]:
            available_authorities = [{"name": "City Department", "email": "chrishabh1000@gmail.com", "type": "general", "timezone": "UTC"}]
        
        # Issue-specific recommended actions
        if issue_type == "fire":
            actions = ["Dispatch fire department immediately.", "Evacuate area if necessary.", "Investigate cause after extinguishing."]
        elif issue_type == "pothole":
            actions = ["Fill pothole and mark with cones within 48 hours.", "Conduct follow-up inspection after repair."]
        elif issue_type == "garbage":
            actions = ["Remove debris within 24 hours.", "Install additional trash bins in the area."]
        elif issue_type == "flood":
            actions = ["Deploy pumps and sandbags immediately.", "Clear drainage systems within 12 hours."]
        elif issue_type == "vandalism":
            actions = ["Remove graffiti within 72 hours.", "Repair damaged property.", "Increase security patrols."]
        elif issue_type == "structural_damage":
            actions = ["Cordon off the area immediately.", "Conduct structural inspection within 24 hours.", "Repair or reinforce structure as needed."]
        elif issue_type == "property_damage":
            actions = ["Assess extent of damage.", "Contact property owner within 24 hours.", "Arrange repairs within 48 hours."]
        else:
            actions = [f"Notify the {department} for immediate action.", "Conduct a professional inspection."]
        
        report = {
            "issue_overview": {
                "issue_type": issue_type.title(),
                "severity": severity.lower(),
                "confidence": confidence,
                "category": category,
                "summary_explanation": f"AI identified a {issue_type} at {location_str} based on: {description}."
            },
            "detailed_analysis": {
                "root_causes": "Wear and tear or heavy traffic." if issue_type == "pothole" else "Undetermined; requires inspection.",
                "potential_consequences_if_ignored": "Vehicle damage or accidents." if issue_type == "pothole" else "Potential safety or compliance risks.",
                "public_safety_risk": severity.lower(),
                "environmental_impact": "none" if issue_type == "pothole" else "low",
                "structural_implications": "low" if issue_type not in ["structural_damage", "property_damage"] else "medium",
                "legal_or_regulatory_considerations": "Road safety regulations." if issue_type == "pothole" else "Local regulations may apply.",
                "feedback": f"User-provided decline reason: {decline_reason}" if decline_reason else None
            },
            "recommended_actions": actions,
            "responsible_authorities_or_parties": responsible_authorities,
            "available_authorities": available_authorities,
            "additional_notes": f"Location: {location_str}. View live location: {map_link}. Issue ID: {issue_id}. Track report: https://momentum-ai.org/track/{report_id}. Zip Code: {zip_code if zip_code else 'N/A'}.",
            "template_fields": {
                "oid": report_id,
                "timestamp": local_time,
                "utc_time": utc_time,
                "priority": priority,
                "tracking_link": f"https://momentum-ai.org/track/{report_id}",
                "image_filename": image_filename,
                "ai_tag": issue_type.title(),
                "app_version": "1.5.3",
                "device_type": "Mobile (Generic)",
                "map_link": map_link,
                "zip_code": zip_code if zip_code else "N/A"
            }
        }
        if decline_reason:
            report["issue_overview"]["summary_explanation"] += f" Declined due to: {decline_reason}."
        return report