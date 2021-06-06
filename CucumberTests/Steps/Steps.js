/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { defineFeature, loadFeature } from 'jest-cucumber';

const feature = loadFeature('features/LoggingIn.feature');

defineFeature(feature, test => {
    let passwordValidator = new PasswordValidator();
    let accessGranted = false;

    beforeEach(() => {
        passwordValidator = new PasswordValidator();
      });
    
    test('Check the Login form', ({
      when,
      then
    }) => {
      when(/^I enter (.*)$/, (password) => {
        accessGranted = passwordValidator.validatePassword(password);
      });
  
      then(/^I should see the message (.*)$/, (arg0) => {
        expect(accessGranted).toBe(true);
      });
    });
  });