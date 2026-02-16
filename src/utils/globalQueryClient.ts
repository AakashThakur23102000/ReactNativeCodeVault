import { MutationCache, QueryClient } from "@tanstack/react-query";

function GlobalQueryClient({ navigation }: { navigation: any }): QueryClient {
    return new QueryClient({
        mutationCache: new MutationCache({
            onSuccess: () => {
                console.log("OnSuccess got hit")
                // navigation.navigate(NavigationPaths.BOTTOM_TAB_STACK, { screen: NavigationPaths.HOME });
            }
        })
    })
}

export default GlobalQueryClient