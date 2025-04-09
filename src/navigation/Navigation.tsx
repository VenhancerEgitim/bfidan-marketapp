import { NavigationContainer } from "@react-navigation/native";
import { PropsWithChildren } from "react";

type NavigationProps= PropsWithChildren;
export const Navigation = ({children} : NavigationProps) => {
    return (
        <NavigationContainer>
            {children}  
        </NavigationContainer>
    )
}