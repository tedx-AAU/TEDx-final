import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Checkbox,
  Alert,
  Snackbar,
  Fade,
  Card,
  CardContent,
} from '@mui/material';
import { apiConfig } from '../config/api';
import { apiRequest } from '../services/api';

interface FormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  isStudent: string;
  university?: string;
  gender: string;
  age: string;
  heard: string;
  about: string;
  numberOfTickets: number;
  agreeTerms: boolean;
}

interface BookingFormProps {
  onSubmitSuccess?: () => void;
  onError?: (message: string) => void;
  onSuccess?: (message: string) => void;
  loading?: boolean;
  setLoading?: (loading: boolean) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  onSubmitSuccess,
  onError,
  onSuccess,
  loading: externalLoading,
  setLoading: setExternalLoading,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      numberOfTickets: 1,
    },
  });

  const isStudent = watch('isStudent');
  const isLoading = externalLoading !== undefined ? externalLoading : loading;
  const setIsLoading = setExternalLoading || setLoading;

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
    if (severity === 'success') {
      onSuccess?.(message);
    } else {
      onError?.(message);
    }
  };const onSubmit = async (data: FormData) => {
  try {
    setIsLoading(true);

   
    const response = await axios.post('http://127.0.0.1:5000/api/registration', {
      ...data,
      numberOfTickets: data.numberOfTickets || 1,
    });

    if (response.status === 201 || response.status === 200) {
      showSnackbar('Registration Successful! wait your ticket. ', 'success');
      reset(); 
    }

  } catch (error: any) {
    console.error('Error details:', error);
    showSnackbar('Server Connection Error', 'error');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          py: { xs: 3, sm: 6 },
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Fade in timeout={800}>
          <Card
            elevation={0}
            sx={{
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px)',
              borderRadius: 4,
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(230, 43, 31, 0.2)',
              overflow: 'hidden',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: '#E62B1F',
              },
            }}
          >
            <CardContent sx={{ p: { xs: 3, sm: 5, md: 6 } }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography
                  variant="h3"
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    color: '#1a1a1a',
                    mb: 1,
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                  }}
                >
                  Book Your Tickets
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(0, 0, 0, 0.7)',
                    mt: 1,
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                  }}
                >
                  Join us for an inspiring TEDx experience
                </Typography>
              </Box>

              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                  '& .MuiTextField-root, & .MuiFormControl-root': {
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      '& fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.2)',
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(230, 43, 31, 0.15)',
                        '& fieldset': {
                          borderColor: 'rgba(230, 43, 31, 0.4)',
                        },
                      },
                      '&.Mui-focused': {
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                        boxShadow: '0 4px 20px rgba(230, 43, 31, 0.2)',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderWidth: 2,
                          borderColor: '#E62B1F',
                        },
                      },
                    },
                    '& .MuiInputLabel-root': {
                      fontWeight: 500,
                      color: 'rgba(0, 0, 0, 0.7)',
                      '&.Mui-focused': {
                        color: '#E62B1F',
                      },
                    },
                    '& .MuiFormHelperText-root': {
                      color: 'rgba(0, 0, 0, 0.6)',
                      '&.Mui-error': {
                        color: '#E62B1F',
                      },
                    },
                    '& .MuiOutlinedInput-root.Mui-error': {
                      '& fieldset': {
                        borderColor: '#E62B1F',
                      },
                    },
                    '& .MuiSelect-icon': {
                      color: 'rgba(0, 0, 0, 0.7)',
                    },
                  },
                  '& .MuiMenuItem-root': {
                    '&:hover': {
                      backgroundColor: 'rgba(230, 43, 31, 0.1)',
                    },
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(230, 43, 31, 0.15)',
                      color: '#E62B1F',
                      '&:hover': {
                        backgroundColor: 'rgba(230, 43, 31, 0.2)',
                      },
                    },
                  },
                }}
              >
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      {...register('fullName', {
                        required: 'Full Name is required',
                      })}
                      error={!!errors.fullName}
                      helperText={errors.fullName?.message}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      {...register('phoneNumber', {
                        required: 'Phone Number is required',
                      })}
                      error={!!errors.phoneNumber}
                      helperText={errors.phoneNumber?.message}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      {...register('email', { required: 'Email is required' })}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Address"
                      {...register('address', {
                        required: 'Address is required',
                      })}
                      error={!!errors.address}
                      helperText={errors.address?.message}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth error={!!errors.isStudent}>
                      <InputLabel>Are You A Student?</InputLabel>
                      <Select
                        label="Are You A Student?"
                        {...register('isStudent', {
                          required: 'This field is required',
                        })}
                        defaultValue=""
                      >
                        <MenuItem value="">Select...</MenuItem>
                        <MenuItem value="yes">Yes</MenuItem>
                        <MenuItem value="no">No</MenuItem>
                      </Select>
                      {errors.isStudent && (
                        <FormHelperText>
                          {errors.isStudent.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="If Yes, What University/School?"
                      {...register('university')}
                      disabled={isStudent !== 'yes'}
                      sx={{
                        '& .MuiOutlinedInput-root.Mui-disabled': {
                          backgroundColor: 'rgba(0, 0, 0, 0.05)',
                          '& fieldset': {
                            borderColor: 'rgba(0, 0, 0, 0.1)',
                          },
                          '& input': {
                            color: 'rgba(0, 0, 0, 0.4)',
                          },
                        },
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth error={!!errors.gender}>
                      <InputLabel>Gender</InputLabel>
                      <Select
                        label="Gender"
                        {...register('gender', {
                          required: 'Gender is required',
                        })}
                        defaultValue=""
                      >
                        <MenuItem value="">Select...</MenuItem>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                      </Select>
                      {errors.gender && (
                        <FormHelperText>{errors.gender.message}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Age"
                      type="number"
                      {...register('age', { required: 'Age is required' })}
                      error={!!errors.age}
                      helperText={errors.age?.message}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="How Did You Hear About TEDxAmman Arab University"
                      multiline
                      rows={4}
                      {...register('heard', {
                        required: 'This field is required',
                      })}
                      error={!!errors.heard}
                      helperText={errors.heard?.message}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Tell Us About Yourself (Optional)"
                      multiline
                      rows={4}
                      {...register('about')}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <FormControl fullWidth>
                      <InputLabel>Number of Tickets</InputLabel>
                      <Select
                        label="Number of Tickets"
                        {...register('numberOfTickets')}
                        defaultValue={1}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <MenuItem key={num} value={num}>
                            {num}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: 'rgba(230, 43, 31, 0.1)',
                        border: '1px solid rgba(230, 43, 31, 0.3)',
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            {...register('agreeTerms', {
                              required: 'You must agree to the terms',
                            })}
                            sx={{
                              color: '#E62B1F',
                              '&.Mui-checked': {
                                color: '#E62B1F',
                              },
                            }}
                          />
                        }
                        label={
                          <Typography
                            sx={{
                              fontSize: { xs: '0.875rem', sm: '1rem' },
                              color: 'rgba(0, 0, 0, 0.8)',
                            }}
                          >
                            I agree to the{' '}
                            <Button
                              variant="text"
                              onClick={() => setOpenDialog(true)}
                              sx={{
                                p: 0,
                                minWidth: 'auto',
                                textTransform: 'none',
                                color: '#E62B1F',
                                fontWeight: 600,
                                textDecoration: 'underline',
                                '&:hover': {
                                  backgroundColor: 'transparent',
                                  color: '#c5241a',
                                },
                              }}
                            >
                              Terms and Policies
                            </Button>{' '}
                            *
                          </Typography>
                        }
                      />
                      {errors.agreeTerms && (
                        <FormHelperText
                          error
                          sx={{ ml: 4.5, color: '#E62B1F !important' }}
                        >
                          {errors.agreeTerms.message}
                        </FormHelperText>
                      )}
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      size="large"
                      disabled={isLoading}
                      sx={{
                        mt: 2,
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        borderRadius: 2,
                        background: isLoading ? '#666666' : '#E62B1F',
                        boxShadow: isLoading
                          ? 'none'
                          : '0 4px 15px rgba(230, 43, 31, 0.5)',
                        transition: 'all 0.3s ease',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        color: '#FFFFFF',
                        '&:hover': {
                          background: isLoading ? '#666666' : '#c5241a',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 20px rgba(230, 43, 31, 0.6)',
                        },
                        '&:active': {
                          transform: 'translateY(0)',
                        },
                      }}
                    >
                      {isLoading ? 'Submitting...' : 'Submit Booking'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Container>

      {/* Terms and Conditions Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: 'rgba(245, 245, 245, 0.98)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(230, 43, 31, 0.2)',
            maxHeight: '90vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <DialogTitle
          sx={{
            background: '#E62B1F',
            color: 'white',
            fontWeight: 700,
            fontSize: '1.5rem',
            py: 2.5,
            px: 3,
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            borderBottom: '3px solid rgba(0, 0, 0, 0.1)',
          }}
        >
          Terms and Conditions
        </DialogTitle>
        <DialogContent
          sx={{
            pt: 4,
            px: 3,
            pb: 2,
            backgroundColor: 'rgba(250, 250, 250, 0.95)',
            color: '#1a1a1a',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(0, 0, 0, 0.05)',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(230, 43, 31, 0.3)',
              borderRadius: '4px',
              '&:hover': {
                background: 'rgba(230, 43, 31, 0.5)',
              },
            },
          }}
        >
          <Typography
            variant="h6"
            paragraph
            sx={{
              fontWeight: 700,
              color: '#E62B1F',
              mb: 2,
              pt: 1,
              fontSize: '1.1rem',
            }}
          >
            Terms and Conditions for TEDxAmman Arab University Event
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              color: 'rgba(0, 0, 0, 0.8)',
              mb: 3,
              fontSize: '0.95rem',
              lineHeight: 1.6,
            }}
          >
            By purchasing a ticket and attending this event, you agree to the
            following terms and conditions:
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 2.5,
              mb: 3,
              listStyle: 'none',
              '& li': {
                position: 'relative',
                pl: 2.5,
                mb: 2,
                '&::before': {
                  content: '"•"',
                  position: 'absolute',
                  left: 0,
                  color: '#E62B1F',
                  fontSize: '1.5rem',
                  lineHeight: '1.2',
                },
              },
            }}
          >
            <Typography
              component="li"
              variant="body2"
              sx={{
                color: 'rgba(0, 0, 0, 0.85)',
                fontSize: '0.9rem',
                lineHeight: 1.7,
              }}
            >
              Tickets are non-refundable and non-transferable without prior
              written consent.
            </Typography>
            <Typography
              component="li"
              variant="body2"
              sx={{
                color: 'rgba(0, 0, 0, 0.85)',
                fontSize: '0.9rem',
                lineHeight: 1.7,
              }}
            >
              Attendees must comply with all venue rules and regulations.
            </Typography>
            <Typography
              component="li"
              variant="body2"
              sx={{
                color: 'rgba(0, 0, 0, 0.85)',
                fontSize: '0.9rem',
                lineHeight: 1.7,
              }}
            >
              The event organizers reserve the right to refuse entry or remove
              attendees for inappropriate behavior.
            </Typography>
            <Typography
              component="li"
              variant="body2"
              sx={{
                color: 'rgba(0, 0, 0, 0.85)',
                fontSize: '0.9rem',
                lineHeight: 1.7,
              }}
            >
              Photography and recording may be restricted in certain areas.
            </Typography>
            <Typography
              component="li"
              variant="body2"
              sx={{
                color: 'rgba(0, 0, 0, 0.85)',
                fontSize: '0.9rem',
                lineHeight: 1.7,
              }}
            >
              Event schedule and speakers are subject to change without notice.
            </Typography>
            <Typography
              component="li"
              variant="body2"
              sx={{
                color: 'rgba(0, 0, 0, 0.85)',
                fontSize: '0.9rem',
                lineHeight: 1.7,
              }}
            >
              Attendees are responsible for their personal belongings.
            </Typography>
            <Typography
              component="li"
              variant="body2"
              sx={{
                color: 'rgba(0, 0, 0, 0.85)',
                fontSize: '0.9rem',
                lineHeight: 1.7,
              }}
            >
              The organizers are not liable for any loss, damage, or injury
              during the event.
            </Typography>
          </Box>
          <Box
            sx={{
              mt: 3,
              pt: 2,
              borderTop: '1px solid rgba(230, 43, 31, 0.2)',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(0, 0, 0, 0.7)',
                fontSize: '0.9rem',
                fontStyle: 'italic',
              }}
            >
              For any questions or concerns, please contact us through our
              official channels.
            </Typography>
          </Box>
          <Box
            sx={{
              mt: 3,
              pt: 2,
              display: 'flex',
              justifyContent: 'flex-end',
              borderTop: '1px solid rgba(0, 0, 0, 0.1)',
            }}
          >
            <Button
              onClick={() => setOpenDialog(false)}
              variant="contained"
              sx={{
                background: '#E62B1F',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                px: 4,
                py: 1.2,
                borderRadius: 2,
                fontWeight: 600,
                color: '#FFFFFF',
                fontSize: '0.9rem',
                boxShadow: '0 2px 8px rgba(230, 43, 31, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: '#c5241a',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 12px rgba(230, 43, 31, 0.4)',
                },
              }}
            >
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        TransitionComponent={Fade}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{
            width: '100%',
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            fontSize: '1rem',
            fontWeight: 500,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default BookingForm;
