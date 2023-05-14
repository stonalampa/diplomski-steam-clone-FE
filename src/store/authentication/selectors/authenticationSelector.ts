import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const authenticationSelector = (state: RootState) => state.authentication;

export const jwtTokenState = createSelector(authenticationSelector, (state) => state.jwtToken);
export const isAdmin = createSelector(authenticationSelector, (state) => state.isAdmin);
