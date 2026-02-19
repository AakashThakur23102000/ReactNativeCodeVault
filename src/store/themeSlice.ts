import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Appearance } from 'react-native';

export type ThemeModeType = 'light' | 'dark' | 'systemLight' | 'systemDark';

export type ThemeColorsType = {
    statusBarAndSafeAreaView: string;
    headerColor: string;
    drawerColor: string;
    background1: string;


    textColor: string;
    textColor2: string;
    placeholderColor: string;

    primary100: string;
    primary500: string;
    primary1000: string;

    secondary100: string;
    secondary500: string;


};

const lightThemeColors: ThemeColorsType = {
    statusBarAndSafeAreaView: "#f8f8fa",
    drawerColor: "red",
    headerColor: "red",
    background1: '#f8f8fa',

    textColor: "#5d7186",
    textColor2: "#d25d8a",
    placeholderColor: "#bbbbc1",

    primary100: "#df97ac",
    primary500: "#d25d8a",
    primary1000: "#cc1e4a",

    secondary100: "#aacc6c",
    secondary500: "#3b9953"
};

const darkThemeColors: ThemeColorsType = {
    statusBarAndSafeAreaView: "#14142B",
    headerColor: "#14142B",
    drawerColor: "#262338",
    background1: '#14142B',

    textColor: "#ffffff",
    textColor2: "#d25d8a",
    placeholderColor: "#bbbbc1",

    primary100: "#df97ac",
    primary500: "#d25d8a",
    primary1000: "#cc1e4a",
    secondary100: "#aacc6c",
    secondary500: "#3b9953"
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