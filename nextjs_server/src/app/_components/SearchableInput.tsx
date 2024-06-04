"use client"
import { ChipTypeMap, TextField, TextFieldProps, TextFieldVariants, useAutocomplete } from "@mui/material";
import Autocomplete, { AutocompleteChangeDetails, AutocompleteChangeReason, AutocompleteInputChangeReason, AutocompleteProps } from "@mui/material/Autocomplete";
import { Variant } from "@mui/material/styles/createTypography";
import debounce from "lodash/debounce";
import { HTMLAttributes, RefObject, SyntheticEvent, useCallback, useEffect, useRef, useState } from "react";
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
    afterOnInputChange,
    afterGetOptions,
    defaultValue,
    props
    // getOptionLabel
}:{
    autocompleteProps?:Partial<Omit<AutocompleteProps<Value|string, false,false,boolean>,"getOptionLabel">>,
    // getOptionLabel:(item:Value)=>string,
    textFieldProps?:{variant?: Variant;} & Omit<TextFieldProps, 'variant'>,
    formRegister:UseFormRegisterReturn<any>,
    fetchData:(input:string)=>Promise<Value[]>,
    afterOnChange?:(props:{event: SyntheticEvent<Element, Event>, value: Value|string|null , reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<Value|string> | undefined,options:(Value|string)[]} ) => void
    afterOnInputChange?:(props:{event: SyntheticEvent<Element, Event>, value: Value|string|null , reason: AutocompleteInputChangeReason,options:(Value|string)[]} ) => void
    afterGetOptions?:(props:{inputValue: Value|string|null,options:(Value|string)[]} ) => void,
    defaultValue?:string|Value,
    props?:{
        optionLabel?:keyof Value,
        // optionID?:keyof Value,
    }
}){
    const [options,setOptions]=useState<(Value|string)[]>([]);
    const [inputValue,setInputValue]=useState<string>("");
    const [value,setValue]=useState<Value|string|null>(null);
    useEffect(()=>{
        if(typeof defaultValue !== "undefined"){
            setValue(defaultValue);
        }
    },[defaultValue])
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
            afterGetOptions&&afterGetOptions({inputValue,options:v})
		})
	}, [inputValue]);
    const {ref:formRegisterRef,...formRegisterNoRef}=formRegister;
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
            // {...(props?.optionID?{
            //         renderOption:(props:HTMLAttributes<HTMLLIElement>, option:string | Value) => (
            //                 <li {...props} key={(typeof option==="string")?option:option[props.optionID]}>
            //                     {typeof option==="string"?option:option[props!.optionLabel!]}
            //                 </li>
            //         )
            //     }:{}
            //     )
            // }
            onInputChange={(event, value,reason) => {
                setInputValue(value)
                afterOnInputChange&&afterOnInputChange({event, value,reason,options})
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    fullWidth
                    autoComplete='off'
                    {...textFieldProps}
                    inputRef={formRegister.ref}
                    {...formRegister}
                />
            )}
            onChange={(event,value,reason,details) => {
                console.log("onchanged")
                console.log(value)
                if(value){
                    setOptions([value,...options])
                    setValue(value);
                }
                afterOnChange&&afterOnChange({event,value,reason,details,options})
            }}
            {...autocompleteProps}
        />
    )
}