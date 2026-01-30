import { useRef, useState } from 'react';
import { nanoid } from 'nanoid/non-secure';
import { Image } from 'expo-image';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

export type TaskType = {
  id: string;
  text: string;
  completed: boolean;
};

type FeedbackType = 'completed' | 'deleted' | 'added' | 'uncompleted';

const FEEDBACK_DURATION_MS = 3500;

const CAT_IMAGES: Record<FeedbackType, number> = {
  completed: require('@/assets/images/cat-yay.gif'),
  deleted: require('@/assets/images/cat-sus.gif'),
  added: require('@/assets/images/cat-watching.gif'),
  uncompleted: require('@/assets/images/cat-close.gif'),
};

export default function HomeScreen() {
  const background = useThemeColor({}, 'background');
  const card = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const textColor = useThemeColor({}, 'text');
  const placeholderColor = useThemeColor({}, 'icon');
  const deleteColor = useThemeColor({}, 'delete');
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [inputText, setInputText] = useState('');
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackImageError, setFeedbackImageError] = useState(false);
  const feedbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showFeedback = (type: FeedbackType) => {
    if (feedbackTimeoutRef.current !== null) {
      clearTimeout(feedbackTimeoutRef.current);
      feedbackTimeoutRef.current = null;
    }
    setFeedbackImageError(false);
    setFeedbackType(type);
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedbackType(null);
      setFeedbackImageError(false);
      feedbackTimeoutRef.current = null;
    }, FEEDBACK_DURATION_MS);
  };

  const FEEDBACK_LABELS: Record<FeedbackType, string> = {
    completed: 'Done!',
    deleted: 'Deleted',
    added: 'Added',
    uncompleted: 'Undone',
  };

  const handleAddTask = () => {
    if (!inputText.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: nanoid(), text: inputText.trim(), completed: false },
    ]);
    setInputText('');
    showFeedback('added');
  };

  const handleToggleComplete = (id: string) => {
    setTasks((prev) => {
      const next = prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );
      const task = next.find((t) => t.id === id);
      if (task?.completed) showFeedback('completed');
      else showFeedback('uncompleted');
      return next;
    });
  };

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    showFeedback('deleted');
  };

  return (
    <View style={[styles.screen, { backgroundColor: background }]}>
      <ScrollView
        style={[styles.scrollView, { backgroundColor: background }]}
        contentContainerStyle={styles.screenContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.titleBlock}>
          <ThemedText type="title" style={styles.screenTitle}>
            Do Meows
          </ThemedText>
          <ThemedText style={styles.screenSubtitle}>
            ~ your daily scratch list ~
          </ThemedText>
        </View>
        <ThemedView style={styles.addTaskContainer}>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: card,
                borderColor: border,
                color: textColor,
              },
            ]}
            placeholder="New task..."
            placeholderTextColor={placeholderColor}
            value={inputText}
            onChangeText={setInputText}
          />
          <Pressable
            onPress={handleAddTask}
            style={({ pressed }) => [
              styles.addButton,
              pressed && styles.pressedOpacity,
            ]}
          >
            <ThemedText type="defaultSemiBold" style={styles.addButtonText}>
              Add
            </ThemedText>
          </Pressable>
        </ThemedView>
        <ThemedView style={styles.taskList}>
        {tasks.map((task) => (
          <View
            key={task.id}
            style={[styles.taskRow, { backgroundColor: card, borderColor: border }]}
          >
            <Pressable
              onPress={() => handleToggleComplete(task.id)}
              style={({ pressed }) => [
                styles.checkboxTouchTarget,
                pressed && styles.pressedOpacity,
              ]}
              hitSlop={12}
            >
              <View style={[styles.checkbox, task.completed && styles.checkboxChecked]}>
                {task.completed && (
                  <ThemedText style={styles.checkboxCheck}>✓</ThemedText>
                )}
              </View>
            </Pressable>
            <ThemedText
              style={[styles.taskText, task.completed && styles.taskTextCompleted]}
              numberOfLines={2}
            >
              {task.text}
            </ThemedText>
            <View style={styles.taskControls}>
              <Pressable
                onPress={() => handleToggleComplete(task.id)}
                style={({ pressed }) => [
                  styles.taskControl,
                  pressed && styles.pressedOpacity,
                ]}
              >
                <ThemedText type="defaultSemiBold">
                  {task.completed ? 'Undo' : 'Complete'}
                </ThemedText>
              </Pressable>
              <Pressable
                onPress={() => handleDelete(task.id)}
                style={({ pressed }) => [
                  styles.taskControl,
                  styles.deleteControl,
                  pressed && styles.pressedOpacity,
                ]}
              >
                <ThemedText
                  type="defaultSemiBold"
                  style={[styles.deleteText, { color: deleteColor }]}
                >
                  Delete
                </ThemedText>
              </Pressable>
            </View>
          </View>
        ))}
        </ThemedView>
      </ScrollView>
      {feedbackType !== null && (
        <View style={styles.feedbackOverlay} pointerEvents="none">
          <View style={styles.feedbackCat}>
            {feedbackImageError ? (
              <ThemedText style={styles.feedbackFallbackText}>
                {FEEDBACK_LABELS[feedbackType]}
              </ThemedText>
            ) : (
              <Image
                key={feedbackType}
                source={CAT_IMAGES[feedbackType]}
                style={styles.feedbackCatImage}
                contentFit="contain"
                onError={() => setFeedbackImageError(true)}
              />
            )}
          </View>
        </View>
      )}
    </View>
  );
}

const MIN_TOUCH_TARGET = 44;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  screenContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  titleBlock: {
    marginTop: 16,
    marginBottom: 24,
  },
  screenTitle: {
    lineHeight: 40,
    paddingBottom: 4,
  },
  screenSubtitle: {
    fontSize: 15,
    opacity: 0.85,
    fontStyle: 'italic',
    marginTop: 2,
  },
  addTaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    minHeight: MIN_TOUCH_TARGET,
  },
  addButton: {
    backgroundColor: '#5b9bd5',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 10,
    minHeight: MIN_TOUCH_TARGET,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
  },
  feedbackOverlay: {
    ...StyleSheet.absoluteFillObject,
    top: undefined,
    bottom: 48,
    left: 24,
    right: 24,
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 10,
  },
  feedbackCat: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  feedbackCatImage: {
    width: 140,
    height: 140,
  },
  feedbackFallbackText: {
    fontSize: 18,
    fontWeight: '600',
    paddingVertical: 24,
    paddingHorizontal: 32,
    minWidth: 140,
    textAlign: 'center',
  },
  pressedOpacity: {
    opacity: 0.7,
  },
  taskList: {
    gap: 12,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 10,
    minHeight: MIN_TOUCH_TARGET + 16,
  },
  checkboxTouchTarget: {
    padding: 10,
    margin: -10,
    alignSelf: 'center',
    minWidth: MIN_TOUCH_TARGET,
    minHeight: MIN_TOUCH_TARGET,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#5b9bd5',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#5b9bd5',
    borderColor: '#5b9bd5',
  },
  checkboxCheck: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.65,
  },
  taskControls: {
    flexDirection: 'row',
    gap: 8,
  },
  taskControl: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    minHeight: MIN_TOUCH_TARGET,
    justifyContent: 'center',
    borderRadius: 8,
  },
  deleteControl: {},
  deleteText: {},
});
