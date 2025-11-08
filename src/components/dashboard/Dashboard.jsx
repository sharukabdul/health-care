import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import BedtimeIcon from '@mui/icons-material/Bedtime';

export default function Dashboard() {
  const userName = 'David';
  const stats = [
    {
      id: 1,
      title: 'Steps',
      value: '3620',
      sub: '/6000 steps',
      percent: 60,
      icon: <DirectionsWalkIcon />,
      iconBg: '#ecfff7',
      iconColor: '#00c853',
      note: 'Now',
    },
    {
      id: 2,
      title: 'Active Time',
      value: '56',
      sub: '/60 mins',
      percent: 93,
      icon: <WhatshotIcon />,
      iconBg: '#fff4f2',
      iconColor: '#ff7043',
      meta: '1712 Kcal | 1.23km',
    },
    {
      id: 3,
      title: 'Sleep',
      value: '6.5',
      sub: '/8 hrs',
      percent: 81,
      icon: <BedtimeIcon />,
      iconBg: '#fff9ec',
      iconColor: '#ffb300',
      meta: '11:30 pm - 06:00 am',
    },
  ];

  const reminders = [
    { id: 1, text: 'Upcoming: Annual blood test on 23rd Jan 2025' },
  ];

  const tips = [
    {
      id: 1,
      text: 'Stay hydrated! Aim to drink at least 8 glasses of water per day.',
    },
  ];

  function StatCard({ stat }) {
    return (
      <Paper
        elevation={1}
        sx={{
          p: 3,
          borderRadius: 2,
          minHeight: 160,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Stack spacing={1}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
              >
                <Avatar
                  sx={{
                    bgcolor: stat.iconBg,
                    color: stat.iconColor,
                    width: 36,
                    height: 36,
                  }}
                >
                  {stat.icon}
                </Avatar>
                <Typography sx={{ fontWeight: 600 }}>{stat.title}</Typography>
              </Stack>

              <Box>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 800, lineHeight: 1 }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: 'inline', ml: 1 }}
                >
                  {stat.sub}
                </Typography>
              </Box>
            </Stack>

            <Box sx={{ alignSelf: 'center' }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: 700 }}
              >
                {stat.percent}%
              </Typography>
            </Box>
          </Stack>

          {stat.meta && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: 'block', mt: 1 }}
            >
              {stat.meta}
            </Typography>
          )}
        </Box>

        <Box sx={{ mt: 2 }}>
          <LinearProgress
            variant="determinate"
            value={stat.percent}
            sx={{ height: 8, borderRadius: 8 }}
          />
        </Box>
      </Paper>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{ pt: 6, pb: 6 }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 800 }}
      >
        Welcome, {userName}
      </Typography>

      <Typography
        variant="h6"
        sx={{ mb: 2, fontWeight: 600 }}
      >
        Wellness Goals
      </Typography>

      <Grid
        container
        spacing={3}
        alignItems="stretch"
      >
        {stats.map((s) => (
          <Grid
            item
            xs={12}
            md={4}
            key={s.id}
            sx={{ display: 'flex' }}
          >
            <StatCard stat={s} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Paper
          elevation={1}
          sx={{ p: 3, borderRadius: 2 }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, mb: 1 }}
          >
            Preventive Care Reminders
          </Typography>
          <Box
            component="ul"
            sx={{ pl: 3, m: 0 }}
          >
            {reminders.map((r) => (
              <li
                key={r.id}
                style={{ marginBottom: 6 }}
              >
                <Typography variant="body1">{r.text}</Typography>
              </li>
            ))}
          </Box>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Paper
          elevation={1}
          sx={{ p: 3, borderRadius: 2 }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, mb: 1 }}
          >
            Health Tip of the Day
          </Typography>
          <Typography variant="body1">{tips[0].text}</Typography>
        </Paper>
      </Box>
    </Container>
  );
}
