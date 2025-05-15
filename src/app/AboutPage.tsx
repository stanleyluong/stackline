import {
  Box,
  Container,
  Link,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';

const techStack = [
  { name: 'React', link: 'https://react.dev/', category: 'Frontend Library' },
  {
    name: 'TypeScript',
    link: 'https://www.typescriptlang.org/',
    category: 'Language',
  },
  {
    name: 'Redux & Redux Toolkit',
    link: 'https://redux-toolkit.js.org/',
    category: 'State Management',
  },
  {
    name: 'React Router DOM',
    link: 'https://reactrouter.com/',
    category: 'Routing',
  },
  {
    name: 'Chart.js & react-chartjs-2',
    link: 'https://www.chartjs.org/',
    category: 'Charting',
  },
  {
    name: 'Material-UI (MUI)',
    link: 'https://mui.com/',
    category: 'UI Components & Styling',
  },
  {
    name: 'Emotion (used by MUI)',
    link: 'https://emotion.sh/',
    category: 'Styling',
  },
  {
    name: 'AG-Grid',
    link: 'https://www.ag-grid.com/',
    category: 'Data Grid (Sales Table)',
  },
  {
    name: 'React Icons',
    link: 'https://react-icons.github.io/react-icons/',
    category: 'Icons',
  },
  {
    name: 'Create React App (react-scripts)',
    link: 'https://create-react-app.dev/',
    category: 'Build & Development Tool',
  },
  {
    name: 'Jest & React Testing Library',
    link: 'https://jestjs.io/',
    category: 'Testing',
  },
  { name: 'ESLint', link: 'https://eslint.org/', category: 'Linting' },
  {
    name: 'Prettier',
    link: 'https://prettier.io/',
    category: 'Code Formatting',
  },
  {
    name: 'AWS Amplify',
    link: 'https://aws.amazon.com/amplify/',
    category: 'Target Deployment Platform',
  },
];

// Group by category
const groupedTechStack = techStack.reduce(
  (acc, tech) => {
    acc[tech.category] = acc[tech.category] || [];
    acc[tech.category].push(tech);
    return acc;
  },
  {} as Record<string, typeof techStack>
);

const AboutPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ textAlign: 'center', mb: 3 }}
        >
          About This Application
        </Typography>
        <Typography variant="body1" paragraph>
          This application is a product display and sales data visualization
          tool, built with a modern and robust tech stack. It is designed to
          showcase product information, reviews, and sales trends in an
          intuitive and responsive interface.
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ mt: 4, mb: 2 }}
        >
          Technology Stack
        </Typography>
        {Object.entries(groupedTechStack).map(([category, techs]) => (
          <Box key={category} sx={{ mb: 3 }}>
            <Typography variant="h6" component="h3" gutterBottom>
              {category}
            </Typography>
            <List dense>
              {techs.map((tech) => (
                <ListItem key={tech.name} disablePadding>
                  <ListItemText
                    primary={
                      <Link
                        href={tech.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="hover"
                      >
                        {tech.name}
                      </Link>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 4, textAlign: 'center' }}
        >
          Developed by Stanley Luong for Stackline.
        </Typography>
      </Paper>
    </Container>
  );
};

export default AboutPage;
