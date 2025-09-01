import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import HouseIcon from '@mui/icons-material/House';
import CallIcon from '@mui/icons-material/Call';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

const steps = [
  {
    id: 1,
    title: 'Find a House',
    description:
      'Browse listings by location, price and house type. View images and house details before booking.',
    icon: <HouseIcon sx={{ fontSize: 60, color: '#F8B500' }} />,
  },
  {
    id: 2,
    title: 'Contact the Owner',
    description:
      'Get contact details or message the landlord directly to arrange a visit or booking.',
    icon: <CallIcon sx={{ fontSize: 60, color: '#F8B500' }} />,
  },
  {
    id: 3,
    title: 'Move In & Manage',
    description:
      'Secure your house and manage your tenancy easily. Landlords can also manage listings and tenants.',
    icon: <AssignmentTurnedInIcon sx={{ fontSize: 60, color: '#F8B500' }} />,
  },
];

function HowItWorks() {
  return (
    <Box
      sx={{
        backgroundColor: '#2A2A2A',
        minHeight: '75vh', // full screen height
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        py: 8,
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontWeight: 'bold',
          color: '#F7F7F7',
          mb: 5,
          fontSize: { xs: '28px', md: '36px' },
        }}
      >
        How It Works
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {steps.map((step) => (
          <Grid item key={step.id}>
            <Card
              sx={{
                width: 300,
                height: 350,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                p: 3,
                borderRadius: 3,
                backgroundColor: '#FFFFFF', // white cards
                color: '#111111',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.5)',
                },
              }}
            >
              {step.icon}
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 'bold', mb: 2, color: '#111111' }}
                >
                  {step.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#444444' }}>
                  {step.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default HowItWorks;
