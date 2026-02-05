import { useRouter } from 'expo-router';
import React from 'react';

import { Cover } from '@/components/cover';
import {
  Button,
  FocusAwareStatusBar,
  SafeAreaView,
  Text,
  View,
} from '@/components/ui';
import { useIsFirstTime } from '@/lib/hooks';

export default function Onboarding() {
  const [_, setIsFirstTime] = useIsFirstTime();
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <FocusAwareStatusBar />

      <View className="w-full flex-1">
        <Cover />
      </View>

      <View className="w-full px-6 pb-12">
        <Text className="mb-4 text-center text-4xl font-bold">
          Obytes Starter
        </Text>
        <Text className="mb-8 text-center text-lg text-gray-600">
          The right way to build your mobile app
        </Text>

        <View className="space-y-3">
          <Text className="text-lg"> Production-ready</Text>
          <Text className="text-lg"> Developer experience + Productivity</Text>
          <Text className="text-lg"> Minimal code and dependencies</Text>
          <Text className="text-lg">
             Well maintained third-party libraries
          </Text>
        </View>

        <SafeAreaView className="mt-10">
          <Button
            label="Let's Get Started"
            onPress={() => {
              setIsFirstTime(false);
              router.replace('/login');
            }}
          />
        </SafeAreaView>
      </View>
    </View>
  );
}
