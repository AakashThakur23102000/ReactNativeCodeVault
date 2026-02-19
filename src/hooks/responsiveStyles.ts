import { StyleSheet, useWindowDimensions } from "react-native";
import type { ViewStyle, TextStyle, ImageStyle } from "react-native";
import { useMemo } from "react";

const RANGES = [
    { name: "tinyPhone", min: 0, max: 320 },
    { name: "smallPhone", min: 320, max: 360 },
    { name: "phone", min: 360, max: 600 },
    { name: "tablet", min: 600, max: 840 },
    { name: "bigScreen", min: 840, max: 99999 },
] as const;

type BucketName = (typeof RANGES)[number]["name"];
type Orientation = "portrait" | "landscape";

// ✅ FIX 1: union, not intersection
type RNStyle = ViewStyle | TextStyle | ImageStyle;

// ✅ FIX 2: do NOT allow string everywhere (RN already allows string where valid)
type StyleMap = Record<string, RNStyle>;

type PartialBase<Base extends StyleMap> = { [K in keyof Base]?: Partial<Base[K]> };
type DeviceOverrides<Base extends StyleMap> = Partial<Record<BucketName, PartialBase<Base>>>;
type LandscapeFixes<Base extends StyleMap> =
    { all?: PartialBase<Base> } & Partial<Record<BucketName, PartialBase<Base>>>;

// ✅ a generic "create" signature that both StyleSheet.create and ScaledSheet.create match
type NamedStyles<T> = { [P in keyof T]: RNStyle };
type CreateSheetFn = <T extends NamedStyles<T> | NamedStyles<any>>(stylesObject: T) => any;

export type ResponsiveConfig<Base extends StyleMap> = {
    baseStyles: Base;
    deviceOverrides?: DeviceOverrides<Base>;
    landscapeFixes?: LandscapeFixes<Base>;
    createSheet?: CreateSheetFn; // ✅ now accepts ScaledSheet.create
};

function pickBucket(shortest: number): BucketName {
    for (const r of RANGES) {
        if (shortest >= r.min && shortest < r.max) return r.name;
    }
    return RANGES.at(-1)!.name;
}

function pickOrientation(width: number, height: number): Orientation {
    return height >= width ? "portrait" : "landscape";
}

function mergeBaseWithOverride<Base extends StyleMap>(base: Base, override?: PartialBase<Base>): Base {
    if (!override) return base;

    const out: any = { ...base };
    for (const key of Object.keys(override)) {
        out[key] = { ...(base as any)[key], ...(override as any)[key] };
    }
    return out as Base;
}

/**
 * ✅ Main hook (memoized)
 */
export function useResponsiveStyles<Base extends StyleMap>(config: ResponsiveConfig<Base>): Base {
    const { width, height } = useWindowDimensions();
    const shortest = Math.min(width, height);

    const bucket = pickBucket(shortest);
    const orientation = pickOrientation(width, height);

    const deviceOverrides = config.deviceOverrides ?? {};
    const landscapeFixes = config.landscapeFixes;

    const createSheet: CreateSheetFn = config.createSheet ?? StyleSheet.create;
    // ✅ memoize so sheet doesn't recreate on every render
    return useMemo(() => {
        let merged = mergeBaseWithOverride(config.baseStyles, deviceOverrides[bucket]);

        if (orientation === "landscape" && landscapeFixes) {
            merged = mergeBaseWithOverride(merged, landscapeFixes.all);
            merged = mergeBaseWithOverride(merged, landscapeFixes[bucket]);
        }

        return createSheet(merged) as Base;
    }, [
        bucket,
        orientation,
        config.baseStyles,
        config.deviceOverrides,
        config.landscapeFixes,
        config.createSheet,
    ]);
}

/** optional helpers */
export function useBucket(): BucketName {
    const { width, height } = useWindowDimensions();
    return pickBucket(Math.min(width, height));
}

export function useOrientation(): Orientation {
    const { width, height } = useWindowDimensions();
    return pickOrientation(width, height);
}
