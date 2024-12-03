// src/components/landingPage/Footer.tsx
import React, { useState } from 'react';
import {
  Apple as AppleIcon,
  Android as AndroidIcon,
  Call as CallIcon,
  Facebook as FacebookIcon,
  FmdGood as FmdGoodIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Mail as MailIcon,
} from '@mui/icons-material';
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Modal,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ModalContent from './ModalContent';

const Footer: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<
    'ourStory' | 'privacyPolicy' | 'termsOfService' | 'team' | null
  >(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery('(min-width:600px) and (max-width:900px)');
  const isSuperMobile = useMediaQuery('(min-width:0px) and (max-width:380px)');

  const handleLogoClick = () => {
    window.scrollTo(0, 0);
  };

  const handleOpenModal = (
    content: 'ourStory' | 'privacyPolicy' | 'termsOfService' | 'team'
  ) => {
    setModalContent(content);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalContent(null);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#f0f0f0',
        color: 'black',
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        boxShadow: '0px -4px 8px rgba(0, 0, 0, 0.2)',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      }}
    >
      {/* Top Section */}
      <Box
        sx={{
          pt: isMobile ? 1 : 2,
          px: isMobile ? 1 : isSuperMobile ? 0 : 6,
          pb: isMobile ? 1 : 2,
        }}
      >
        <Grid
          container
          spacing={1}
          direction={isMobile ? 'column' : 'row'}
          alignItems={isMobile ? 'center' : 'flex-start'}
        >
          {/* Logo Section */}
          {!isMobile && (
            <Grid item xs={12} sm={isTablet ? 3 : 6}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  cursor: 'pointer',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  gap: 1,
                }}
                onClick={handleLogoClick}
              >
                <img
                  src="/images/footer-logo.png"
                  alt="Logo"
                  style={{ height: '40px', marginRight: '16px' }}
                />
                <Typography variant="h6" sx={{ color: 'black' }}>
                  #Placeholder
                </Typography>
              </Box>
            </Grid>
          )}

          {/* Grouped Columns: About, App, Legal */}
          <Grid item xs={12} sm={isTablet ? 9 : isMobile ? 10 : 6}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: isSuperMobile ? 1 : isMobile ? 4 : 4,
                flexWrap: 'wrap',
              }}
            >
              {/* ABOUT Column */}
              <Box>
                <Typography
                  variant="h6"
                  fontWeight={300}
                  sx={{
                    mb: 1,
                    borderBottom: '0.5px solid rgba(0,0,0,0.5)',
                    fontSize: isSuperMobile
                      ? '0.8rem'
                      : isMobile
                      ? '0.9rem'
                      : '1rem',
                  }}
                >
                  About
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: 'pointer',
                    mb: 0.5,
                    color: 'black',
                    fontSize: isSuperMobile
                      ? '0.65rem'
                      : isMobile
                      ? '0.75rem'
                      : '0.875rem',
                  }}
                  onClick={() => handleOpenModal('ourStory')}
                >
                  Our Story
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: 'pointer',
                    color: 'black',
                    fontSize: isSuperMobile
                      ? '0.65rem'
                      : isMobile
                      ? '0.75rem'
                      : '0.875rem',
                  }}
                  onClick={() => handleOpenModal('team')}
                >
                  Team
                </Typography>
              </Box>

              {/* APP Column */}
              <Box sx={{ pl: 1 }}>
                <Typography
                  variant="h6"
                  fontWeight={300}
                  sx={{
                    mb: 1,
                    borderBottom: '0.5px solid rgba(0,0,0,0.5)',
                    fontSize: isSuperMobile
                      ? '0.8rem'
                      : isMobile
                      ? '0.9rem'
                      : '1rem',
                  }}
                >
                  App
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <AppleIcon
                    sx={{
                      mr: 0.5,
                      color: 'black',
                      fontSize: isSuperMobile
                        ? 'small'
                        : isMobile
                        ? 'medium'
                        : 'default',
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'black',
                      fontSize: isSuperMobile
                        ? '0.65rem'
                        : isMobile
                        ? '0.75rem'
                        : '0.875rem',
                    }}
                  >
                    iOS
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AndroidIcon
                    sx={{
                      mr: 0.5,
                      color: 'black',
                      fontSize: isSuperMobile
                        ? 'small'
                        : isMobile
                        ? 'medium'
                        : 'default',
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'black',
                      fontSize: isSuperMobile
                        ? '0.65rem'
                        : isMobile
                        ? '0.75rem'
                        : '0.875rem',
                    }}
                  >
                    Android
                  </Typography>
                </Box>
              </Box>

              {/* LEGAL Column */}
              <Box>
                <Typography
                  variant="h6"
                  fontWeight={300}
                  sx={{
                    mb: 1,
                    borderBottom: '0.5px solid rgba(0,0,0,0.5)',
                    fontSize: isSuperMobile
                      ? '0.8rem'
                      : isMobile
                      ? '0.9rem'
                      : '1rem',
                  }}
                >
                  Legal
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: 'pointer',
                    mb: 0.5,
                    color: 'black',
                    fontSize: isSuperMobile
                      ? '0.65rem'
                      : isMobile
                      ? '0.75rem'
                      : '0.875rem',
                  }}
                  onClick={() => handleOpenModal('privacyPolicy')}
                >
                  Privacy Policy
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: 'pointer',
                    color: 'black',
                    fontSize: isSuperMobile
                      ? '0.65rem'
                      : isMobile
                      ? '0.75rem'
                      : '0.875rem',
                  }}
                  onClick={() => handleOpenModal('termsOfService')}
                >
                  Terms of Service
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Divider */}
      <Divider
        sx={{
          backgroundColor: 'black',
          width: '95%',
          margin: '0 auto',
        }}
      />

      {/* Bottom Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 0.5,
          px: isSuperMobile ? 2 : 6,
        }}
      >
        {/* Copyright */}
        <Typography variant="body2" sx={{ flex: 1, textAlign: 'left' }}>
          &copy;2024 walkmanxy™
        </Typography>

        {/* Social Links */}
        <Box>
          {/* Call IconButton */}
          <IconButton sx={{ color: 'green', mr: -1.2 }} aria-label="Call">
            <CallIcon
              sx={{
                fontSize: isSuperMobile ? '1rem' : isMobile ? '1.2rem' : undefined,
              }}
            />
          </IconButton>
          <IconButton sx={{ color: '#D44638', mr: -1.4 }} aria-label="Email">
            <MailIcon
              sx={{
                fontSize: isSuperMobile ? '1rem' : isMobile ? '1.2rem' : undefined,
              }}
            />
          </IconButton>
          {/* Google Maps IconButton */}
          <IconButton sx={{ color: '#4285F4', mr: -1.3 }} aria-label="Google Maps">
            <FmdGoodIcon
              sx={{
                fontSize: isSuperMobile ? '1rem' : isMobile ? '1.2rem' : undefined,
              }}
            />
          </IconButton>
          {/* Facebook IconButton */}
          <IconButton sx={{ color: '#3b5998', mr: -1.1 }} aria-label="Facebook">
            <FacebookIcon
              sx={{
                fontSize: isSuperMobile ? '1rem' : isMobile ? '1.2rem' : undefined,
              }}
            />
          </IconButton>
          {/* Instagram IconButton */}
          <IconButton sx={{ color: '#E1306C', mr: -1.2 }} aria-label="Instagram">
            <InstagramIcon
              sx={{
                fontSize: isSuperMobile ? '1rem' : isMobile ? '1.2rem' : undefined,
              }}
            />
          </IconButton>
          {/* LinkedIn IconButton */}
          <IconButton sx={{ color: '#0077B5' }} aria-label="LinkedIn">
            <LinkedInIcon
              sx={{
                fontSize: isSuperMobile ? '1rem' : isMobile ? '1.2rem' : undefined,
              }}
            />
          </IconButton>
        </Box>
      </Box>

      {/* Modal for About, Privacy Policy, and Terms of Service */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            padding: 2,
          }}
          onClick={handleCloseModal}
        >
          <Paper
            elevation={3}
            sx={{
              padding: '2rem',
              maxWidth: '80dvh',
              maxHeight: '90dvh',
              overflowY: 'auto',
              textAlign: 'left',
              borderRadius: 2,
              '@media (max-width: 600px)': {
                width: '80%',
              },
            }}
          >
            {modalContent && (
              <ModalContent
                contentKey={modalContent}
                onClose={handleCloseModal}
              />
            )}
          </Paper>
        </Box>
      </Modal>
    </Box>
  );
};

export default React.memo(Footer);
