import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useRegisterUserMutation } from '../../providers/UsersProvider';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [fullName, setFullName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvc, setCvc] = useState('');
  // const {data, loading, error} =
  const [register, { isLoading, isError, isSuccess, error }] = useRegisterUserMutation();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    register(e);
    console.log('🚀 ~ file: Register.tsx:24 ~ handleSubmit ~ e:', e);
  };

  return (
    <Container maxWidth='sm'>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h4' align='center'>
              Register
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Username'
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Password'
              type='password'
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Confirm Password'
              type='password'
              fullWidth
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Email'
              type='email'
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Date of Birth'
              type='date'
              fullWidth
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Full Name'
              fullWidth
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Card Number'
              fullWidth
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label='Expiration Date'
              fullWidth
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label='CVC'
              fullWidth
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              required
            />
          </Grid>
        </Grid>
        <Button type='submit'>ClickMe</Button>
      </form>
    </Container>
  );
}
