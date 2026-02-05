import { FlashList } from '@shopify/flash-list';
import React from 'react';

import type { Post } from '@/api';
import { usePosts } from '@/api';
import { Card } from '@/components/card';
import { EmptyList, FocusAwareStatusBar, Text, View } from '@/components/ui';

export default function Feed() {
  const { data, isPending, isError } = usePosts();

  const renderItem = React.useCallback(
    ({ item }: { item: Post }) => <Card {...item} />,
    []
  );

  // Always return a component — no early returns that could confuse Metro
  return (
    <View className="flex-1">
      <FocusAwareStatusBar />
      {isError ? (
        <View className="flex-1 items-center justify-center">
          <Text>Error loading data</Text>
        </View>
      ) : (
        <FlashList
          data={data ?? []} // fallback to empty array
          renderItem={renderItem}
          keyExtractor={(_, index) => `item-${index}`}
          ListEmptyComponent={<EmptyList isLoading={isPending} />}
        />
      )}
    </View>
  );
}
