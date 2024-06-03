"use client"
import { ChipTypeMap, TextField, TextFieldProps, TextFieldVariants, useAutocomplete } from "@mui/material";
import Autocomplete, { AutocompleteChangeDetails, AutocompleteChangeReason, AutocompleteProps } from "@mui/material/Autocomplete";
import { Variant } from "@mui/material/styles/createTypography";
import debounce from "lodash/debounce";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { useFetch } from "../_helpers/client";

export default function SearchableInput<
    Value,
    Variant extends TextFieldVariants="standard"
>({
    autocompleteProps,
    textFieldProps,
    formRegister,
    fetchData,
    afterOnChange,
    props
    // getOptionLabel
}:{
    autocompleteProps?:Partial<Omit<AutocompleteProps<Value|string, false,false,boolean>,"getOptionLabel">>,
    // getOptionLabel:(item:Value)=>string,
    textFieldProps?:{variant?: Variant;} & Omit<TextFieldProps, 'variant'>,
    formRegister:UseFormRegisterReturn<any>,
    fetchData:(input:string)=>Promise<Value[]>,
    afterOnChange?:(event: SyntheticEvent<Element, Event>, value: Value|string|null , reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<Value|string> | undefined) => void
    props?:{
        optionLabel?:keyof Value,
    }
}){
    const [options,setOptions]=useState<(Value|string)[]>([]);
    const [inputValue,setInputValue]=useState<string>("");
    const [value,setValue]=useState<Value|string|null>(null);
	const getOptionsDelayed=useCallback(
		debounce((input:string|null,callback:(v:any)=>any)=>{
			if (!input) {
				return;
			}
			fetchData(input).then(callback);
		},200),[]
	)
	useEffect(() => {
		getOptionsDelayed(inputValue,(v:Value[]) => {
			if(v){
                setOptions(v);
            } else{
                setOptions([]);
            }
		})
	}, [inputValue]);
    return (
        <Autocomplete
            options={options}
            value={value}
            inputValue={inputValue}
            {...(props?.optionLabel?{getOptionLabel:(option:string | Value)=>{
                if(typeof option==="string"){
                    return option
                } else{
                    return option[props!.optionLabel!] as string
                }
            }}:{})}
            onInputChange={(e, value) => setInputValue(value)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    fullWidth
                    autoComplete='off'
                    {...textFieldProps}
                    {...formRegister}
                />
            )}
            onChange={(e, value, ...args) => {
                console.log("onchanged")
                setOptions(value?[value,...options]:options);
                if(value){
                    setValue(value);
                }
                afterOnChange&&afterOnChange(e, value, ...args)
            }}
            {...autocompleteProps}
        />
    )
}