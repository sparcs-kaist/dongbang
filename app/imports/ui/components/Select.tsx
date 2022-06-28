import React, {Children, cloneElement, isValidElement} from "react";
import {ButtonProps, DivProps} from "react-html-props";
import styled from "styled-components";


interface SelectProps extends Omit<DivProps, "onChange"> {
    value?: string;
    onChange?: (value: string) => void;
}

const UnstyledSelect: React.FC<SelectProps> = ({value, onChange, children, ...props}) => (
    <div {...props}>
        {Children.map(children, child => isValidElement(child)
            && cloneElement(child, {currentValue: value, setValue: onChange})
        )}
    </div>
);

export const Select = styled(UnstyledSelect)`
  display: flex;
  flex-direction: row;
  background-color: var(--grey-800);
  color: var(--grey-650);
  border-radius: var(--border-radius);
  width: 100%;
  height: 50px;
  font-size: 15px;
  overflow: hidden;
`;


interface SelectItemProps extends ButtonProps {
    value?: string;
    currentValue?: string;
    setValue?: (value: string | undefined) => void;
}

export const UnstyledSelectItem: React.FC<SelectItemProps> = ({value, currentValue, setValue, ...props}) => (
    <button
        {...props}
        onClick={() => setValue?.(value)}
    />
);

export const SelectItem = styled(UnstyledSelectItem).attrs(props => ({
    active: props.currentValue === props.value
}))`
  flex: 1;
  height: 100%;
  font-size: inherit;
  background: ${({active}) => active ? "var(--theme-500)" : "none"};
  color: ${({active}) => active ? "var(--grey-900)" : "inherit"};
`;
