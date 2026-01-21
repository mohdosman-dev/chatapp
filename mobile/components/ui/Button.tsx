import {
  Text,
  Pressable,
  ActivityIndicator,
  PressableProps,
} from "react-native";
import React from "react";

interface ButtonProps extends PressableProps {
  title: string;
  variant?: "primary" | "secondary" | "outline";
  isLoading?: boolean;
}

export const Button = ({
  title,
  variant = "primary",
  isLoading,
  className = "rounded-xl",
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles = "w-full h-14 items-center justify-center flex-row";
  const variants = {
    primary: "bg-primary shadow-lg shadow-primary/20",
    secondary: "bg-surface-light border border-surface-soft",
    outline: "border-2 border-primary bg-transparent",
  };

  const textVariants = {
    primary: "text-white font-bold text-lg",
    secondary: "text-foreground font-medium text-lg",
    outline: "text-primary font-bold text-lg",
  };

  return (
    <Pressable
      className={`${baseStyles} ${variants[variant]} ${className} ${disabled || isLoading ? "opacity-50" : ""}`}
      style={({ pressed }) => ({
        opacity: pressed ? 0.8 : 1,
      })}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === "outline" ? "#F4A261" : "#FFF"} />
      ) : (
        <Text className={textVariants[variant]}>{title}</Text>
      )}
    </Pressable>
  );
};
