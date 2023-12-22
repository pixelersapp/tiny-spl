import type {
  CSSProperties,
  FC,
  MouseEvent,
  PropsWithChildren,
  ReactElement,
} from "react";
import React from "react";
import { Button } from "react95";

export type AppWalletButtonProps = PropsWithChildren<{
  className?: string;
  disabled?: boolean;
  endIcon?: ReactElement;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  startIcon?: ReactElement;
  style?: CSSProperties;
  tabIndex?: number;
  open?: boolean;
}>;

export const AppWalletButton: FC<AppWalletButtonProps> = (props) => {
  return (
    <Button
      className="font-bold"
      active={props.open}
      disabled={props.disabled}
      style={props.style}
      onClick={props.onClick}
      tabIndex={props.tabIndex || 0}
      type="button"
    >
      {props.startIcon && (
        <i className="wallet-adapter-button-start-icon">{props.startIcon}</i>
      )}
      {props.children}
      {props.endIcon && (
        <i className="wallet-adapter-button-end-icon">{props.endIcon}</i>
      )}
    </Button>
  );
};
