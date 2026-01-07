import re
from typing import Dict, List, Tuple
from difflib import SequenceMatcher

class JobMatcher:
    """Match jobs with resumes"""
    
    def __init__(self):
        self.skill_keywords = {
            'python': ['python', 'django', 'flask', 'numpy', 'pandas'],
            'java': ['java', 'spring', 'hibernate', 'j2ee'],
            'javascript': ['javascript', 'typescript', 'node.js', 'react', 'angular', 'vue'],
            'database': ['sql', 'mysql', 'postgresql', 'mongodb', 'redis'],
            'cloud': ['aws', 'azure', 'gcp', 'docker', 'kubernetes'],
            'devops': ['jenkins', 'gitlab', 'ci/cd', 'terraform', 'ansible']
        }
    
    def calculate_match(self, job_description: str, resume_data: Dict) -> float:
        """Calculate match score between job and resume"""
        if not job_description or not resume_data:
            return 0.0
        
        skills = resume_data.get('skills', [])
        experience_years = resume_data.get('total_experience', 0)
        
        # Extract requirements from job description
        job_skills = self.extract_skills_from_job(job_description)
        required_years = self.extract_experience_requirement(job_description)
        
        # Calculate skill match
        skill_match_score = self.calculate_skill_match(job_skills, skills)
        
        # Calculate experience match
        experience_match_score = self.calculate_experience_match(required_years, experience_years)
        
        # Combined score (70% skills, 30% experience)
        total_score = (skill_match_score * 0.7) + (experience_match_score * 0.3)
        
        return min(100.0, total_score * 100)
    
    def extract_skills_from_job(self, job_description: str) -> List[str]:
        """Extract required skills from job description"""
        skills = []
        job_lower = job_description.lower()
        
        for skill_category, skill_list in self.skill_keywords.items():
            for skill in skill_list:
                if skill in job_lower:
                    skills.append(skill)
        
        # Look for common phrases
        skill_phrases = [
            r'experience with (\w+\s*\w*)',
            r'knowledge of (\w+\s*\w*)',
            r'proficient in (\w+\s*\w*)',
            r'familiar with (\w+\s*\w*)'
        ]
        
        for phrase in skill_phrases:
            matches = re.findall(phrase, job_lower)
            for match in matches:
                if len(match.split()) <= 3:  # Avoid long phrases
                    skills.append(match.strip())
        
        return list(set(skills))
    
    def extract_experience_requirement(self, job_description: str) -> float:
        """Extract years of experience required from job description"""
        patterns = [
            r'(\d+)\+?\s*years?',
            r'(\d+)\s*-\s*(\d+)\s*years?',
            r'(\d+)\s*years?\s*experience'
        ]
        
        job_lower = job_description.lower()
        
        for pattern in patterns:
            matches = re.findall(pattern, job_lower)
            for match in matches:
                if isinstance(match, tuple):
                    # Range like "3-5 years"
                    try:
                        min_years = float(match[0])
                        max_years = float(match[1]) if len(match) > 1 else min_years
                        return (min_years + max_years) / 2
                    except:
                        continue
                else:
                    # Single number like "3 years"
                    try:
                        return float(match)
                    except:
                        continue
        
        return 0.0  # Default if no requirement found
    
    def calculate_skill_match(self, job_skills: List[str], resume_skills: List[str]) -> float:
        """Calculate skill match percentage"""
        if not job_skills:
            return 1.0  # No skills required = perfect match
        
        if not resume_skills:
            return 0.0
        
        # Convert to lowercase for comparison
        job_skills_lower = [s.lower() for s in job_skills]
        resume_skills_lower = [s.lower() for s in resume_skills]
        
        # Find matching skills
        matching_skills = []
        for job_skill in job_skills_lower:
            for resume_skill in resume_skills_lower:
                if self.skills_match(job_skill, resume_skill):
                    matching_skills.append(job_skill)
                    break
        
        match_ratio = len(matching_skills) / len(job_skills_lower)
        return match_ratio
    
    def skills_match(self, skill1: str, skill2: str, threshold: float = 0.8) -> bool:
        """Check if two skills match (allowing for variations)"""
        # Direct match
        if skill1 == skill2:
            return True
        
        # Check if one contains the other
        if skill1 in skill2 or skill2 in skill1:
            return True
        
        # Use sequence matcher for fuzzy matching
        similarity = SequenceMatcher(None, skill1, skill2).ratio()
        return similarity >= threshold
    
    def calculate_experience_match(self, required_years: float, actual_years: float) -> float:
        """Calculate experience match percentage"""
        if required_years == 0:
            return 1.0  # No experience required = perfect match
        
        if actual_years >= required_years:
            return 1.0
        else:
            # Linear scaling: 0 years = 0%, required years = 100%
            return actual_years / required_years
    
    def get_matched_skills(self) -> List[str]:
        """Get list of matched skills (for API response)"""
        # This would track matches from the last calculation
        return []