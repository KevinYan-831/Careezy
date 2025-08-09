import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Chip,
  Grid,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';

const ResumePreview: React.FC = () => {
  const { watch } = useFormContext();
  const formData = watch();

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const formatDateRange = (startDate: string, endDate: string, current?: boolean) => {
    const start = formatDate(startDate);
    const end = current ? 'Present' : formatDate(endDate);
    return `${start} - ${end}`;
  };

  return (
    <Paper sx={{ p: 4, minHeight: '800px', bgcolor: 'white' }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
          {formData.personalInfo?.firstName} {formData.personalInfo?.lastName}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {formData.personalInfo?.email && (
            <Typography variant="body2">{formData.personalInfo.email}</Typography>
          )}
          {formData.personalInfo?.phone && (
            <Typography variant="body2">• {formData.personalInfo.phone}</Typography>
          )}
          {formData.personalInfo?.address && (
            <Typography variant="body2">• {formData.personalInfo.address}</Typography>
          )}
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1 }}>
          {formData.personalInfo?.linkedin && (
            <Typography variant="body2" color="primary">
              LinkedIn: {formData.personalInfo.linkedin}
            </Typography>
          )}
          {formData.personalInfo?.github && (
            <Typography variant="body2" color="primary">
              • GitHub: {formData.personalInfo.github}
            </Typography>
          )}
          {formData.personalInfo?.website && (
            <Typography variant="body2" color="primary">
              • Portfolio: {formData.personalInfo.website}
            </Typography>
          )}
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Education */}
      {formData.education && formData.education.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
            EDUCATION
          </Typography>
          {formData.education.map((edu: any, index: number) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {edu.institution}
                  </Typography>
                  <Typography variant="body2">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </Typography>
                  {edu.gpa && (
                    <Typography variant="body2" color="text.secondary">
                      GPA: {edu.gpa}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="body2">{edu.location}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatDateRange(edu.startDate, edu.endDate)}
                  </Typography>
                </Box>
              </Box>
              {edu.coursework && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Relevant Coursework:</strong> {edu.coursework}
                </Typography>
              )}
              {edu.honors && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Honors:</strong> {edu.honors}
                </Typography>
              )}
            </Box>
          ))}
          <Divider sx={{ mt: 2 }} />
        </Box>
      )}

      {/* Experience */}
      {formData.experience && formData.experience.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
            EXPERIENCE
          </Typography>
          {formData.experience.map((exp: any, index: number) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {exp.title}
                  </Typography>
                  <Typography variant="body2">
                    {exp.company} {exp.type && `• ${exp.type}`}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="body2">{exp.location}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </Typography>
                </Box>
              </Box>
              {exp.description && (
                <Typography variant="body2" sx={{ mt: 1, whiteSpace: 'pre-line' }}>
                  {exp.description}
                </Typography>
              )}
              {exp.achievements && (
                <Typography variant="body2" sx={{ mt: 1, whiteSpace: 'pre-line' }}>
                  {exp.achievements}
                </Typography>
              )}
            </Box>
          ))}
          <Divider sx={{ mt: 2 }} />
        </Box>
      )}

      {/* Projects */}
      {formData.projects && formData.projects.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
            PROJECTS
          </Typography>
          {formData.projects.map((project: any, index: number) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {project.name} {project.role && `(${project.role})`}
                  </Typography>
                  {project.technologies && (
                    <Typography variant="body2" color="text.secondary">
                      <strong>Technologies:</strong> {project.technologies}
                    </Typography>
                  )}
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {formatDateRange(project.startDate, project.endDate)}
                </Typography>
              </Box>
              {project.description && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {project.description}
                </Typography>
              )}
              {project.highlights && (
                <Typography variant="body2" sx={{ mt: 1, whiteSpace: 'pre-line' }}>
                  {project.highlights}
                </Typography>
              )}
              <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {project.githubUrl && (
                  <Typography variant="caption" color="primary">
                    GitHub: {project.githubUrl}
                  </Typography>
                )}
                {project.liveUrl && (
                  <Typography variant="caption" color="primary">
                    Live: {project.liveUrl}
                  </Typography>
                )}
              </Box>
            </Box>
          ))}
          <Divider sx={{ mt: 2 }} />
        </Box>
      )}

      {/* Skills */}
      {formData.skills && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
            SKILLS
          </Typography>
          
          {formData.skills.technical && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                Technical Skills
              </Typography>
              <Typography variant="body2">
                {formData.skills.technical}
                {formData.skills.technicalOther && `, ${formData.skills.technicalOther}`}
              </Typography>
            </Box>
          )}
          
          {formData.skills.soft && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                Soft Skills
              </Typography>
              <Typography variant="body2">
                {formData.skills.soft}
                {formData.skills.softOther && `, ${formData.skills.softOther}`}
              </Typography>
            </Box>
          )}
          
          {formData.skills.languages && formData.skills.languages.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                Languages
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.skills.languages.map((lang: any, index: number) => (
                  <Typography key={index} variant="body2">
                    {lang.language} ({lang.proficiency})
                    {index < formData.skills.languages.length - 1 && ', '}
                  </Typography>
                ))}
              </Box>
            </Box>
          )}
          
          {formData.skills.certifications && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                Certifications & Awards
              </Typography>
              <Typography variant="body2">
                {formData.skills.certifications}
              </Typography>
            </Box>
          )}
          
          <Divider sx={{ mt: 2 }} />
        </Box>
      )}

      {/* Activities */}
      {formData.activities && formData.activities.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
            EXTRACURRICULAR ACTIVITIES
          </Typography>
          {formData.activities.map((activity: any, index: number) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {activity.name}
                  </Typography>
                  <Typography variant="body2">
                    {activity.position} {activity.type && `• ${activity.type}`}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="body2">{activity.location}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatDateRange(activity.startDate, activity.endDate, activity.current)}
                  </Typography>
                </Box>
              </Box>
              {activity.description && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {activity.description}
                </Typography>
              )}
              {activity.achievements && (
                <Typography variant="body2" sx={{ mt: 1, whiteSpace: 'pre-line' }}>
                  {activity.achievements}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      )}

      {/* Empty State */}
      {(!formData.personalInfo?.firstName && !formData.personalInfo?.lastName) && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Resume Preview
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Start filling out your information to see a live preview of your resume.
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default ResumePreview;