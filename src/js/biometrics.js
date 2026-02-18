/**
 * Biometrics plugin integration.
 * This is the only file that uses the Capacitor Biometrics plugin.
 * On iOS/Android it asks for Face ID or passcode; on web it does nothing.
 */

import { Capacitor } from '@capacitor/core';
import { Biometrics, ErrorCode } from '@capawesome-team/capacitor-biometrics';

const NATIVE_PLATFORMS = ['ios', 'android'];

/**
 * Returns true if the app is running on a native platform where biometrics can be required.
 * @returns {boolean}
 */
export function isNativePlatform() {
  return NATIVE_PLATFORMS.includes(Capacitor.getPlatform());
}

/**
 * Checks whether biometrics is available on the device.
 * @returns {Promise<boolean>}
 */
export async function isBiometricsAvailable() {
  const { isAvailable } = await Biometrics.isAvailable();
  return isAvailable;
}

/**
 * Checks whether the user has enrolled biometrics (e.g. Face ID / fingerprint).
 * @returns {Promise<boolean>}
 */
export async function isBiometricsEnrolled() {
  const { isEnrolled } = await Biometrics.isEnrolled();
  return isEnrolled;
}

/**
 * Requires the user to pass biometric authentication before continuing.
 * On web, resolves immediately without prompting.
 * On iOS/Android, shows the system biometric prompt and resolves on success, rejects on cancel/error.
 *
 * @param {object} [options] - Optional prompt text (see Capawesome Biometrics docs).
 * @returns {Promise<void>}
 * @throws {Error} With .code set to ErrorCode (e.g. USER_CANCELED, NOT_ENROLLED, NOT_AVAILABLE).
 */
export async function requireBiometricAuth(options = {}) {
  if (!isNativePlatform()) {
    return;
  }

  const available = await isBiometricsAvailable();
  if (!available) {
    const error = new Error(
      'Biometric authentication is not available on this device.'
    );
    error.code = ErrorCode.NOT_AVAILABLE;
    throw error;
  }

  const enrolled = await isBiometricsEnrolled();
  // Biometric authentication should not only but supported by the device, but also configured by the user
  if (!enrolled) {
    // If the user has not enrolled any biometric data, you can prompt them to do so through their device settings.
    // On Android, you can even use the enroll method to guide users through the enrollment process directly from your app.
    if (Capacitor.getPlatform() === 'android') {
      await Biometrics.enroll();
    } else {
      const error = new Error(
        'No biometric authentication is set up on this device.'
      );
      error.code = ErrorCode.NOT_ENROLLED;
      throw error;
    }
  }

  try {
    await Biometrics.authenticate({
      title: 'Authentication Required',
      subtitle: 'Please authenticate to access the app',
      cancelButtonText: 'Cancel',
      iosFallbackButtonText: 'Use Passcode',
      allowDeviceCredential: true,
    });
  } catch (error) {
    alert(getBiometricErrorMessage(error.code));
    throw error;
  }
}

/**
 * User-facing error message for a failed biometric auth.
 * @param {string} [code] - ErrorCode from the plugin.
 * @returns {string}
 */
export function getBiometricErrorMessage(code) {
  switch (code) {
    case ErrorCode.USER_CANCELED:
      return 'Authentication was canceled.';
    case ErrorCode.NOT_ENROLLED:
      return 'No biometrics set up. Please add Face ID or Touch ID in device settings.';
    case ErrorCode.NOT_AVAILABLE:
      return 'Biometric authentication is not available.';
    default:
      return 'Authentication failed. Please try again.';
  }
}
