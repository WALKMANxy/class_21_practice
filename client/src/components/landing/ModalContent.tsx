// src/components/landingPage/ModalContent.tsx
import React from 'react';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ModalContentProps {
  contentKey: 'ourStory' | 'privacyPolicy' | 'termsOfService' | 'team';
  onClose: () => void;
}

const ModalContent: React.FC<ModalContentProps> = ({ contentKey, onClose }) => {
  const renderContent = () => {
    switch (contentKey) {
      case 'ourStory':
        return (
          <Box>
            {/* Title */}
            <Typography variant="h4" sx={{ mb: 2 }}>
              Our Story
            </Typography>
            <Divider
              sx={{
                backgroundColor: 'black',
                width: '95%',
                margin: '0 auto',
                mb: 3,
              }}
            />

            {/* Content */}
            <Typography variant="body2" sx={{ textIndent: '2rem', mb: 2 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              vestibulum, nisl vel vehicula auctor, nulla augue tristique metus,
              sit amet varius nisl nunc eget urna.
            </Typography>
            {/* Add more paragraphs as needed */}
          </Box>
        );

      case 'privacyPolicy':
        return (
          <Box>
            {/* Title */}
            <Typography variant="h4" sx={{ mb: 2 }}>
              Privacy Policy
            </Typography>
            <Divider
              sx={{
                backgroundColor: 'black',
                width: '95%',
                margin: '0 auto',
                mb: 3,
              }}
            />

            {/* Content */}
            <Typography variant="body2" sx={{ textIndent: '2rem', mb: 2 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              venenatis diam in urna cursus, eget tincidunt sem lobortis.
            </Typography>
            {/* Add more paragraphs as needed */}
          </Box>
        );

      case 'termsOfService':
        return (
          <Box>
            {/* Title */}
            <Typography variant="h4" sx={{ mb: 2 }}>
              Terms of Service
            </Typography>
            <Divider
              sx={{
                backgroundColor: 'black',
                width: '95%',
                margin: '0 auto',
                mb: 3,
              }}
            />

            {/* Content */}
            <Typography variant="body2" sx={{ textIndent: '2rem', mb: 2 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              tincidunt, eros ac faucibus facilisis, justo nunc pulvinar nisi,
              non tempus tortor quam quis sapien.
            </Typography>
            {/* Add more paragraphs as needed */}
          </Box>
        );

      case 'team':
        return (
          <Box>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Team
            </Typography>
            <Divider
              sx={{
                backgroundColor: 'black',
                width: '95%',
                margin: '0 auto',
                mb: 3,
              }}
            />

            {/* Content */}
            <Typography variant="body2" sx={{ textIndent: '2rem', mb: 2 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              volutpat metus in sem interdum, in dictum nulla faucibus.
            </Typography>
            {/* Add more paragraphs as needed */}
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box>
      {renderContent()}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <IconButton
          onClick={onClose}
          sx={{
            backgroundColor: 'grey.500',
            color: 'white',
            '&:hover': {
              backgroundColor: 'grey.700',
            },
          }}
          aria-label="Close"
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ModalContent;
