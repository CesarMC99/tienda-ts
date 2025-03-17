import { Path, UseFormRegister } from 'react-hook-form'
import { CheckoutFormValues } from '../../../schema/FormPaySchema'
import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react'

interface InputCheckoutProps {
    register: UseFormRegister<CheckoutFormValues>
    label: string
    type: HTMLInputTypeAttribute
    name: Path<CheckoutFormValues>
    error?: string
    className?: string
    placeholder?: string
    maxLength?: number
    onChangeOverride?: ChangeEventHandler<HTMLInputElement>
}

export const InputCheckout = ({
    register,
    label,
    type,
    name,
    error,
    className,
    placeholder,
    maxLength,
    onChangeOverride,
}: InputCheckoutProps) => {
    return (
        <>
            <label
                className='font-medium text-sm'
                htmlFor={name}
            >
                {label}
            </label>
            <input
                type={type}
                id={name}
                className={`border border-stone-300 px-3 py-2 text-sm rounded-md outline-none ${className}`}
                {...register(name, {
                    onChange: onChangeOverride,
                })}
                placeholder={placeholder}
                maxLength={maxLength}
            />
            {error && <p className='text-red-500 text-sm'>{error}</p>}
        </>
    )
}
