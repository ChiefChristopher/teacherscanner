import { Env } from '@env';
import { makeRedirectUri } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { z } from 'zod';

WebBrowser.maybeCompleteAuthSession();

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export default function LoginScreen() {
  const router = useRouter();

  // Google auth
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: Env.GOOGLE_CLIENT_ID ?? '',
    iosClientId: Env.GOOGLE_IOS_CLIENT_ID ?? '',
    androidClientId: Env.GOOGLE_ANDROID_CLIENT_ID ?? '',
    redirectUri: makeRedirectUri(),
  });

  // Email/password form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle Google login response
  React.useEffect(() => {
    if (response?.type === 'success') {
      const idToken = response.authentication?.idToken;
      if (idToken) {
        handleGoogleSuccess(idToken);
      } else {
        Alert.alert('Error', 'No ID token received');
      }
    }
  }, [response]);

  const handleGoogleSuccess = async (idToken: string) => {
    if (!idToken) {
      Alert.alert('Error', 'No ID token received from Google');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('https://api.speasyapp.com/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Google login failed');

      await SecureStore.setItemAsync('jwt', data.token);
      Alert.alert('Success', 'Logged in with Google!');
      router.replace('/dashboard'); // or your main screen
    } catch (error) {
      Alert.alert('Error', (error as Error).message || 'Failed to log in');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async () => {
    setLoading(true);
    try {
      const result = loginSchema.safeParse({ email, password });
      if (!result.success) {
        const errorMsg = result.error.errors.map((e) => e.message).join('\n');
        Alert.alert('Validation Error', errorMsg);
        return;
      }

      const res = await fetch('https://api.speasyapp.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Login failed');

      await SecureStore.setItemAsync('jwt', data.token);
      Alert.alert('Success', 'Logged in!');
      router.replace('/dashboard');
    } catch (error) {
      Alert.alert('Error', (error as Error).message || 'Failed to log in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Speasy</Text>

      {/* Google Sign-In */}
      <Button
        title="Sign in with Google"
        onPress={() => promptAsync()}
        disabled={!request || loading}
        color="#4285F4"
      />

      <Text style={styles.orText}>— OR —</Text>

      {/* Email/Password Form */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
      />

      <Button
        title="Sign in with Email"
        onPress={handleEmailLogin}
        disabled={loading}
      />

      {loading && <Text style={styles.loading}>Loading...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  orText: {
    marginVertical: 20,
    textAlign: 'center',
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  loading: {
    marginTop: 10,
    textAlign: 'center',
    color: '#888',
  },
});
