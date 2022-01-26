import {
  DependencyList,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';

interface Metadata {
  /** denotes the key is persisted to local storage */
  persisted: boolean;
}

interface State<T> extends Metadata {
  value: T;
}

export function useLocalStorage<T>(
  getKey: (...dependencies: any[]) => string,
  initialValue: T,
  dependencies: DependencyList = [],
  syncWithLocalStorage = true,
  mergeInitialValue = false
): [T, (value: T) => void, Metadata] {
  // Read the current value
  const readValue = (): State<T> => {
    try {
      const item = window.localStorage.getItem(
        userQualifyKey(getKey(...dependencies))
      );
      if (item) {
        const _value = JSON.parse(item) as T;
        if (
          mergeInitialValue &&
          typeof _value === 'object' &&
          !Array.isArray(_value)
        ) {
          let newValues = {};
          for (const key of Object.keys(initialValue)) {
            if (!Object.keys(_value).includes(key)) {
              newValues = {
                ...newValues,
                [key]: initialValue[key as keyof T]
              };
            }
          }
          return {
            value: {
              ..._value,
              ...newValues
            },
            persisted: true
          };
        }

        return {
          value: _value,
          persisted: true
        };
      }

      return {
        value: initialValue,
        persisted: false
      };
    } catch (error) {
      console.log(error);

      return {
        value: initialValue,
        persisted: false
      };
    }
  };

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [state, setState] = useState<State<T>>(() => readValue());

  // Return a wrapped version of useState's setter function that persists the new value to localStorage.
  const setValue = (value: T) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(state.value) : value;

      // Save state
      setState({
        value: valueToStore,
        persisted: syncWithLocalStorage
      });

      // Save to local storage
      if (syncWithLocalStorage) {
        writeToLocalStorage(valueToStore);
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  const writeToLocalStorage = (valueToStore: T) => {
    const key = userQualifyKey(getKey(...dependencies));
    const oldValue = window.localStorage.getItem(key);
    const newValue = JSON.stringify(valueToStore);
    window.localStorage.setItem(key, newValue);

    const event = new StorageEvent('storage', {
      key,
      oldValue,
      newValue,
      storageArea: localStorage
    });
    window.dispatchEvent(event);
  };

  const storageEventHandler = useCallback<(ev: StorageEvent) => void>(
    (event) => {
      const key = userQualifyKey(getKey(...dependencies));
      if (event.key === key) {
        setState(readValue());
      }
    },
    dependencies // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    if (syncWithLocalStorage) {
      window.addEventListener('storage', storageEventHandler);

      return () => {
        window.removeEventListener('storage', storageEventHandler);
      };
    }
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

  // Reload the stored value if dependencies get changed.
  useEffect(() => {
    setState(readValue());
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

  const metadata = useMemo<Metadata>(() => {
    return { persisted: state.persisted };
  }, [state.persisted]);

  return [state.value, setValue, metadata];
}

export function userQualifyKey(key: string) {
  if (key.includes('user')) {
    return key;
  }

  return `user_#getUserId()_${key}`;
}
