import { useState } from 'react';
import assets from '@/assets';
import SelectComponent from '@/components/Form/SelectComponent';
import SwitchComponent from '@/components/Form/SwitchComponent';
import { Icon } from '@iconify/react';
import { Avatar,Box, Divider, Grid, Typography, useTheme, Stack } from '@mui/material';
import UserResponseCard from '../../components/UserResponseCard';
import UserResponseCardLoading from '../../components/UserResponseCardLoading';
import { filterOptions } from '../../DetailInterview.const';
import useDetailInterview from '../../DetailInterview.hooks';
import { useAuth } from '@/context/auth/AuthContext';
import { useSnackbar } from '@/context/snackbar/SnackbarContext';
import axiosUtils from '@/utils/axiosUtils';
import { useNavigate } from 'react-router-dom';
import MenuComponent from '@/components/MenuComponent';
import { navbarMenu } from '../../../../../layout/navbar/Navbar.const';
import Footer from '@/layout/footer';

/*
  Code yang dikomen itu karna penyesuaian data di BE dengan tampilan di FoloUp, jadi nanti kalo dari BE sudah dihandle bisa dinyalakan lagi
*/

const DetailInterviewLayout = ({ children }: { children: React.ReactNode }) => {
  const { logout, isAuthenticated, userData } = useAuth();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openProfile = Boolean(anchorEl);

  const handleClickProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseProfile = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await axiosUtils.post('/auth/logout');
      logout();
      navigate('/', { replace: true });

      showSnackbar('Logout Success', 'success');
    } catch (error) {
      console.log('Error Logout: ', error);
      showSnackbar('Logout Failed. Please try again.', 'error');
    }
  };

  function limitUsername(username?: string) {
    const words = username?.split(' ');
    const truncatedText =
      words && words.length > 3 ? words.slice(0, 3).join(' ') : username;

    return truncatedText;
  }

  const isCandidate = userData?.role === 'CANDIDATE';
  const { method, candidateList, isLoadingCandidateList , detailInterview} =
    useDetailInterview();

  return (
    <Box
      sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        paddingX={3}
        borderBottom={`1px solid ${theme.palette.divider}`}
        height={74}
      >

        {/* LEFT */}
        <Box display="flex" gap={2} alignItems="center">
          <img src={assets.logo79} alt="Logo" style={{ width: 74, height: 74 }} />

          <Stack direction="row" gap={0.5}>
            <Typography
              fontSize={20}
              fontWeight={600}
              color={theme.palette.primary.main}
            >
              AI
            </Typography>

            <Typography
              fontSize={20}
              fontWeight={600}
              color={theme.palette.secondary.main}
            >
              Interview
            </Typography>
          </Stack>
        </Box>


        {/* CENTER */}
        <Box display="flex" alignItems="center" gap={2}>
          <Typography fontSize={18} fontWeight={700}>
            {detailInterview?.name}
          </Typography>

          <Divider orientation="vertical" flexItem />

          <Box display="flex" gap={1}>
            <Icon icon="material-symbols:person-outline" width={24} height={24} />
            <Typography>: {candidateList?.length || 0}</Typography>
          </Box>

          <Divider orientation="vertical" flexItem />

          <Box display="flex" gap={1} alignItems="center">
            <Typography fontSize={14}>Active</Typography>
            <SwitchComponent
              checked={method.watch('isActive')}
              size="small"
              onChange={() => {
                method.setValue('isActive', !method.watch('isActive'));
              }}
            />
          </Box>
        </Box>


        {/* RIGHT */}
        {isAuthenticated && (
          <Box display="flex" gap={2} alignItems="center">
            <button
              onClick={handleClickProfile}
              style={{
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                padding: 0,
                display: 'flex',
                gap: 10,
                color: 'black',
                alignItems: 'center',
              }}
            >
              <Avatar src={assets.avatarDefault} />
              <Typography>{limitUsername(userData.name)}</Typography>
            </button>

            <MenuComponent
              open={openProfile}
              onClose={handleCloseProfile}
              onClick={handleCloseProfile}
              anchorEl={anchorEl}
              items={navbarMenu(theme, handleLogout)}
            />
          </Box>
        )}
      </Box>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {!isCandidate && (
          <Grid
            size={{ xs: 3, lg: 2 }}
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <Box
              display="flex"
              flexDirection="column"
              gap={2}
              padding={2}
              border={`1px solid ${theme.palette.divider}`}
              borderRadius={2}
              flexGrow={1}
            >
              <Box>
                <SelectComponent
                  control={method.control}
                  name="filter"
                  placeholder="Filter by"
                  fullWidth
                  options={filterOptions}
                  startIcon={
                    <Icon
                      icon="lucide:filter"
                      color={theme.palette.text.secondary}
                    />
                  }
                />
              </Box>

              {isLoadingCandidateList && <UserResponseCardLoading />}

              {!isLoadingCandidateList &&
                candidateList.map(item => (
                  <UserResponseCard key={item.candidateId} data={item} />
                ))}
            </Box>
          </Grid>
        )}

        <Grid
          size={{
            xs: 12,
            lg: isCandidate ? 12 : 10,
          }}
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          {children}
        </Grid>
      </Grid>
      <Footer/>
    </Box>
  );
};

export default DetailInterviewLayout;
