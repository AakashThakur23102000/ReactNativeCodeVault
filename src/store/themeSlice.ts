import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Appearance } from 'react-native';

export type ThemeModeType = 'light' | 'dark' | 'systemLight' | 'systemDark';

export type ThemeColorsType = {
    statusBarAndSafeAreaView: string,
    background1: string;

    cardColor: string;

    btnColor: string;
    btnText: string;

    textColor: string;
    textColor2: string;
    placeholderColor: string;

    inputField: string;
    inputBorderDefault: string;
    inputBorderFocused: string;
    inputBorderError: string
};

const lightThemeColors: ThemeColorsType = {
    statusBarAndSafeAreaView: "#f8f8fa",
    background1: '#f8f8fa',

    cardColor: "#ffffff",

    btnColor: "#1c84ee",
    btnText: "white",

    textColor: "#5d7186",
    textColor2: "#313b5e",
    placeholderColor: "#9caab7",


    inputField: "#f8f8fa",
    inputBorderDefault: "#d8dfe7",
    inputBorderFocused: "#b0b0bb",
    inputBorderError: "#ef5f5f"
};

const darkThemeColors: ThemeColorsType = {
    statusBarAndSafeAreaView: "#22282e",
    background1: '#22282e',

    cardColor: "#282f36",

    btnColor: "#1c84ee",
    btnText: "black",

    textColor: "#aab8c5",
    textColor2: "#313b5e",
    placeholderColor: "#7b8896",

    inputField: "#22282e",
    inputBorderDefault: "#3a4551",
    inputBorderFocused: "#4a5663",
    inputBorderError: "rgb(245.4, 159, 159)"
};

const systemModeFromDevice = () =>
    (Appearance.getColorScheme() === 'dark' ? 'systemDark' : 'systemLight') as ThemeModeType;

const baseFor = (mode: ThemeModeType): ThemeColorsType =>
    mode === 'dark' || mode === 'systemDark' ? darkThemeColors : lightThemeColors;

const merge = (base: ThemeColorsType, overrides?: Partial<ThemeColorsType>): ThemeColorsType =>
    ({ ...base, ...(overrides || {}) });

type State = {
    themeMode: ThemeModeType;
    isSystemModeEnabled: boolean;
    colors: ThemeColorsType;
    overridesLight: Partial<ThemeColorsType>;
    overridesDark: Partial<ThemeColorsType>;
};

const first = systemModeFromDevice();
const initialState: State = {
    themeMode: first === 'systemDark' ? 'dark' : 'light',
    isSystemModeEnabled: true,
    overridesLight: {},
    overridesDark: {},
    colors: merge(baseFor(first === 'systemDark' ? 'dark' : 'light'), {}),
};

const recomputeColors = (state: State) => {
    const activeMode = state.themeMode;
    const base = activeMode === 'dark' ? darkThemeColors : lightThemeColors;
    const ov = activeMode === 'dark' ? state.overridesDark : state.overridesLight;
    state.colors = merge(base, ov);
};

export const ThemeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setThemeMode: (state, action: PayloadAction<ThemeModeType>) => {
            const payload = action.payload;
            if (payload === 'systemLight' || payload === 'systemDark') {
                state.isSystemModeEnabled = true;
                state.themeMode = payload === 'systemDark' ? 'dark' : 'light';
            } else {
                state.isSystemModeEnabled = false;
                state.themeMode = payload;
            }
            recomputeColors(state);
        },

        setCustomColors: (
            state,
            action: PayloadAction<{ overrides: Partial<ThemeColorsType>; target?: 'light' | 'dark' | 'both' }>
        ) => {
            const { overrides, target = 'both' } = action.payload;
            if (target === 'light' || target === 'both') {
                state.overridesLight = { ...state.overridesLight, ...overrides };
            }
            if (target === 'dark' || target === 'both') {
                state.overridesDark = { ...state.overridesDark, ...overrides };
            }
            recomputeColors(state);
        },

        resetCustomColors: (
            state,
            action: PayloadAction<{ target?: 'light' | 'dark' | 'both' } | undefined>
        ) => {
            const target = action?.payload?.target ?? 'both';
            if (target === 'light' || target === 'both') state.overridesLight = {};
            if (target === 'dark' || target === 'both') state.overridesDark = {};
            recomputeColors(state);
        },
    },
});

export const { setThemeMode, setCustomColors, resetCustomColors } = ThemeSlice.actions;
export default ThemeSlice.reducer;






// // Read colors anywhere:
// const colors = useSelector((s: RootState) => s.theme.colors);

// // Switch modes (system-aware):
// dispatch(setThemeMode('systemDark'));   // or 'systemLight'
// dispatch(setThemeMode('dark'));
// dispatch(setThemeMode('light'));

// // Override just primary (both modes or specific mode):
// dispatch(setCustomColors({ overrides: { primary100: '#ED8936' } }));             // both
// dispatch(setCustomColors({ overrides: { primary100: '#F6AD55' }, target: 'dark' })); // dark only

// // Reset overrides:
// dispatch(resetCustomColors()); // both
// dispatch(resetCustomColors({ target: 'dark' }));



//   useEffect(() => {
//     const sub = Appearance.addChangeListener(({ colorScheme }) => {
//       if (!isSystemModeEnabled) return;
//       dispatch(setThemeMode(colorScheme === 'dark' ? 'systemDark' : 'systemLight'));
//     });
//     return () => sub.remove();
//   }, [dispatch, isSystemModeEnabled]);
