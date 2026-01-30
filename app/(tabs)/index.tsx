import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Image } from 'expo-image';
import { Button, Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { HelloWave } from '@/components/hello-wave';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export type TaskType = {
  id: string;
  text: string;
  completed: boolean;
};

export default function HomeScreen() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [inputText, setInputText] = useState('');

  const handleAddTask = () => {
    if (!inputText.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: nanoid(), text: inputText.trim(), completed: false },
    ]);
    setInputText('');
  };

  const handleToggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.addTaskContainer}>
        <TextInput
          style={styles.input}
          placeholder="New task..."
          value={inputText}
          onChangeText={setInputText}
        />
        <Button title="Add" onPress={handleAddTask} />
      </ThemedView>
      <ThemedView style={styles.taskList}>
        {tasks.map((task) => (
          <View key={task.id} style={styles.taskRow}>
            <Pressable
              onPress={() => handleToggleComplete(task.id)}
              style={styles.checkboxWrapper}
              hitSlop={8}
            >
              <View style={[styles.checkbox, task.completed && styles.checkboxChecked]}>
                {task.completed && (
                  <ThemedText style={styles.checkboxCheck}>✓</ThemedText>
                )}
              </View>
            </Pressable>
            <ThemedText
              style={[styles.taskText, task.completed && styles.taskTextCompleted]}
              numberOfLines={1}
            >
              {task.text}
            </ThemedText>
            <View style={styles.taskControls}>
              <Pressable
                onPress={() => handleToggleComplete(task.id)}
                style={styles.taskControl}
              >
                <ThemedText type="defaultSemiBold">
                  {task.completed ? 'Undo' : 'Complete'}
                </ThemedText>
              </Pressable>
              <Pressable
                onPress={() => handleDelete(task.id)}
                style={[styles.taskControl, styles.deleteControl]}
              >
                <ThemedText type="defaultSemiBold" style={styles.deleteText}>
                  Delete
                </ThemedText>
              </Pressable>
            </View>
          </View>
        ))}
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Link href="/modal">
          <Link.Trigger>
            <ThemedText type="subtitle">Step 2: Explore</ThemedText>
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
            <Link.MenuAction
              title="Share"
              icon="square.and.arrow.up"
              onPress={() => alert('Share pressed')}
            />
            <Link.Menu title="More" icon="ellipsis">
              <Link.MenuAction
                title="Delete"
                icon="trash"
                destructive
                onPress={() => alert('Delete pressed')}
              />
            </Link.Menu>
          </Link.Menu>
        </Link>

        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addTaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  taskList: {
    gap: 8,
    marginBottom: 16,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  checkboxWrapper: {
    padding: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#666',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#0a7',
    borderColor: '#0a7',
  },
  checkboxCheck: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  taskText: {
    flex: 1,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
    color: '#888',
  },
  taskControls: {
    flexDirection: 'row',
    gap: 8,
  },
  taskControl: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  deleteControl: {},
  deleteText: {
    color: '#c00',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
