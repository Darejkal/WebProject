"use client"
import { ChipTypeMap, TextField, TextFieldProps, TextFieldVariants, useAutocomplete } from "@mui/material";
import Autocomplete, { AutocompleteChangeDetails, AutocompleteChangeReason, AutocompleteInputChangeReason, AutocompleteProps } from "@mui/material/Autocomplete";
import { Variant } from "@mui/material/styles/createTypography";
import debounce from "lodash/debounce";
import { HTMLAttributes, RefObject, SyntheticEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { useFetch } from "../_helpers/client";

export default function SearchableMultiInput<
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
    autocompleteProps?:Partial<Omit<AutocompleteProps<Value|string, boolean,false,boolean>,"getOptionLabel">>,
    // getOptionLabel:(item:Value)=>string,
    textFieldProps?:{variant?: Variant;} & Omit<TextFieldProps, 'variant'>,
    formRegister?:UseFormRegisterReturn<any>,
    fetchData:(input:string)=>Promise<Value[]>,
    afterOnChange?:(props:{event: SyntheticEvent<Element, Event>, value: Value|string|null|(string | Value)[] , reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<Value|string> | undefined,options:(Value|string)[]} ) => void
    afterOnInputChange?:(props:{event: SyntheticEvent<Element, Event>, value: Value|string|null|(string | Value)[] , reason: AutocompleteInputChangeReason,options:(Value|string)[]} ) => void
    afterGetOptions?:(props:{inputValue: Value|string|null|(string | Value)[],options:(Value|string)[]} ) => void,
    defaultValue?:string|Value,
    props?:{
        optionLabel?:keyof Value,
        // optionID?:keyof Value,
    }
}){
    const [options,setOptions]=useState<(Value|string)[]>([]);
    const [inputValue,setInputValue]=useState<string>("");
    const [value,setValue]=useState<Value|string|null|(string | Value)[]>([]);
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
    const filterValue =(val:(string | Value)[]) => {
            if(val){
                if(Array.isArray(val)){
                    if(props?.optionLabel){
                        let result= val.sort((a,b)=>{
                            let aText:string|undefined,bText:string|undefined;
                            if(typeof a==="string"){
                                aText=a
                            } else {
                                aText=a[props.optionLabel!] as string
                            }
                            if(typeof b==="string"){
                                bText=b
                            } else {
                                bText=b[props.optionLabel!] as string
                            }
                            return aText>bText?1:0;
                        }).reduce(
                            (pre,cur)=>{
                            if(pre.length==0){
                                pre.push(cur);
                            } else{
                                let preText;
                                if(typeof pre[pre.length-1]==="string"){
                                    preText=pre[pre.length-1]
                                } else {
                                    preText=(pre[pre.length-1] as Value)[props.optionLabel!]

                                }
                                let curText;
                                if(typeof cur==="string"){
                                    curText=cur
                                } else {
                                    curText=cur[props.optionLabel!]
                                }
                                if(preText!==curText){
                                    pre.push(cur)
                                }
                            }
                            return pre;
                            },[] as (Value|string)[]
                        )
                        return result
                    }
                }
                return val;
            } 
            return []
        }
    return (
        <Autocomplete
            options={options}
            value={value}
            inputValue={inputValue}
            filterOptions={(x)=>filterValue(x)}
            {...(props?.optionLabel?{
                getOptionLabel:(option:string | Value)=>{
                    if(typeof option==="string"){
                        return option
                    } else{
                        return option[props!.optionLabel!] as string
                    }
                },
                isOptionEqualToValue:(option:string | Value, value:string | Value) => {
                    let optionText=option
                    if(typeof option !=="string"){
                        optionText=option[props!.optionLabel!] as string
                    }
                    let valueText=value
                    if(typeof value !=="string"){
                        valueText=value[props!.optionLabel!] as string
                    }
                    return valueText===optionText
                }
        }:{})}
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
                    {...formRegister?{
                        ...formRegister,
                        inputRef:formRegister.ref
                    }:{}}
                />
            )}
            onChange={(event,value,reason,details) => {
                console.log("onchanged")
                console.log(value)
                if(value){
                    if(Array.isArray(value)){
                        setOptions([...value,...options])
                        setValue(value);
                    }else{
                        setOptions([value,...options])
                        setValue([value]);
                    } 
                }
                afterOnChange&&afterOnChange({event,value,reason,details,options})
            }}
            {...autocompleteProps}
        />
    )
}