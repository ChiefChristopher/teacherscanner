import { Stack, useLocalSearchParams } from 'expo-router';
import * as React from 'react';

import { usePost } from '@/api';
import {
  ActivityIndicator,
  FocusAwareStatusBar,
  Text,
  View,
} from '@/components/ui';

export default function Post() {
  const local = useLocalSearchParams<{ id: string }>();

  const { data, isPending, isError } = usePost({
    variables: { id: local.id },
  });

  return (
    <View className="flex-1 p-3">
      {/* Always render the screen options */}
      <Stack.Screen options={{ title: 'Post', headerBackTitle: 'Feed' }} />
      <FocusAwareStatusBar />

      {isPending ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator />
        </View>
      ) : isError ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-center">Error loading post</Text>
        </View>
      ) : (
        <View className="flex-1">
          <Text className="text-xl font-bold">{data?.title}</Text>
          <Text className="mt-4">{data?.body}</Text>
        </View>
      )}
    </View>
  );
}
