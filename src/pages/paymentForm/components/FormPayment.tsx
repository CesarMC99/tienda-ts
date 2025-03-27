import { ProductCard } from './ProductCard'
import { InfoPayment } from './InfoPayments'
import { useAppStore } from '../../../store'
import { SubmitHandler, useForm } from 'react-hook-form'
import { checkoutSchema } from '../../../schema/FormPaySchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputCheckout } from './InputCheckout'
import { RadioInputDelivery } from './RadioInputDelivery'
import { RadioInputPaymentMethod } from './RadioInputPaymentMethod'
import { useEffect } from 'react'
import { CheckoutFormValues } from '../../../types'

export const FormPayment = () => {
    const { totalPriceAllProducts, cartOfProducts, clearCart } = useAppStore()
    const {
        register, //REGISTRAR INPUTS
        handleSubmit, //ENVIAR EL FORMULARIO
        formState: { errors }, //ERRORES DE LAS VALIDACIONES
        watch, // VER CAMBIOS EN LOS INPUTS
        unregister,
        reset, // RESETEAR FORMULARIO
    } = useForm<CheckoutFormValues>({
        defaultValues: {
            //VALORES POR DEFECTO
            delivery: 'express',
            paymentMethod: 'card',
        },
        resolver: zodResolver(checkoutSchema),
    })

    //MONITOREAMOS LOS CAMBIOS HECHOS
    const delivery = watch('delivery')
    const methodPayment = watch('paymentMethod')

    //CADA CAMBION EN DE LAS OPCIONES QUITA EL REGISTRO DE LA OPCION NO SELECCIONADA
    useEffect(() => {
        if (methodPayment === 'card') {
            unregister('bank')
        } else {
            unregister('card')
        }
    }, [methodPayment, unregister])

    // VERIFICA QUE LOS DATOS CUMPLA CON EL ESQUEMA
    const onSubmit: SubmitHandler<CheckoutFormValues> = (data) => {
        // LIMPIAMOS LOS DATOS ANTES DE ENVIAR
        if (data.paymentMethod === 'card') {
            data.bank = undefined
        }

        if (data.paymentMethod === 'bank') {
            data.card = undefined
        }

        //VERIFICAMOS LOS DATOS CON ZOD
        const result = checkoutSchema.safeParse(data)

        if (!result.success) {
            console.log(data, 'ACA')
            console.log('Errores de validacion', result.error.format())
            return
        }

        alert('Pago realizado correctamente')
        console.log(data)
        clearCart()
        reset()
    }

    // BUSCAMOS EL PRECIO TOTAL A PAGAR
    useEffect(() => {
        totalPriceAllProducts(delivery)
    }, [delivery, totalPriceAllProducts])

    return (
        <form
            className='flex flex-col gap-15 md:flex-row'
            onSubmit={handleSubmit(onSubmit)}
        >
            {/* SECCION DE LOS PRODUCTOS Y ENTREGA */}
            <section className='flex flex-col gap-3 flex-1'>
                <h2 className='font-semibold'>Información de Producto</h2>

                {/* ITERAMOS LOS PRODUCTOS POR COMPRAR */}
                <ul>
                    {cartOfProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </ul>

                <h2 className='font-semibold'>Información de Entrega</h2>

                {/* ELEGIMOS EL TIPO DE DELIBERY EXPRESS O FREE */}
                <div className='flex flex-col gap-4'>
                    <RadioInputDelivery
                        register={register}
                        value='express'
                        delivery={delivery}
                    />

                    <RadioInputDelivery
                        register={register}
                        value='free'
                        delivery={delivery}
                    />
                </div>
            </section>

            {/* SECCION DE DETALLES DE PAGO */}
            <section className='flex flex-col gap-4 flex-1 bg-white rounded-xl'>
                <h2 className='font-semibold text-center'>Detalles de Pago</h2>

                {/* INPUT DE EMAIL */}
                <div className='flex flex-col gap-2'>
                    <InputCheckout
                        register={register}
                        name='email'
                        label='Correo Electronico'
                        type='email'
                        placeholder='Ejem: correo@gmail.com'
                        error={errors.email?.message}
                    />
                </div>

                {/* ELEGIR EL METODO DE PAGO CARD O BANK */}
                <div className='flex flex-col gap-2'>
                    <span className='font-medium text-sm'>
                        Seleccione método de pago:
                    </span>
                    <div className='flex gap-6'>
                        <RadioInputPaymentMethod
                            register={register}
                            value='card'
                            paymentMethod={methodPayment}
                        />

                        <RadioInputPaymentMethod
                            register={register}
                            value='bank'
                            paymentMethod={methodPayment}
                        />
                    </div>
                </div>

                {/* FORMULARIO DE TARJETA */}
                {methodPayment === 'card' ? (
                    // SI ELEGIMOS CARD
                    <div className='flex flex-col gap-2'>
                        {/* NOMBRE DE LA TARJETA */}
                        <label className='flex flex-col gap-1'>
                            <InputCheckout
                                label='Nombre de la tarjeta'
                                name='card.name'
                                type='text'
                                register={register}
                                error={errors.card?.name?.message}
                            />
                        </label>

                        {/* NUMERO DE LA TARJETA */}
                        <label className='flex flex-col gap-1'>
                            <InputCheckout
                                label='Numero de la tarjeta'
                                name={'card.number'}
                                type='text'
                                register={register}
                                error={errors.card?.number?.message}
                                onChangeOverride={(e) => {
                                    const value = e.target.value.replace(
                                        /\D/g,
                                        ''
                                    )
                                    e.target.value = (
                                        value.match(/.{1,4}/g)?.join(' ') ?? ''
                                    ).substring(0, 19)
                                }}
                            />
                        </label>

                        {/* FECHA DE EXPIRACION */}
                        <div className='flex gap-2'>
                            <label className='flex flex-col gap-1 flex-1'>
                                <InputCheckout
                                    label='Fecha de expiración'
                                    type='text'
                                    register={register}
                                    name='card.expiration'
                                    error={errors.card?.expiration?.message}
                                    placeholder='MM/YY'
                                    onChangeOverride={(e) => {
                                        //ELIMINA CUALQUIER CARACTER QUE NO SEA NUMERO
                                        const value = e.target.value.replace(
                                            /\D/g,
                                            ''
                                        )
                                        //AGRUPA LOS NUMERO CON UN "/" DE POR MEDIO Y QUE NO TENGA MAS DE 5 CARACTERES
                                        e.target.value = (
                                            value.match(/.{1,2}/g)?.join('/') ??
                                            ''
                                        ).substring(0, 5)
                                    }}
                                />
                            </label>

                            {/* INGRESO DEL CVC DE LA TARJETA */}
                            <label className='flex flex-col gap-1 flex-1'>
                                <InputCheckout
                                    label='CVC'
                                    type='password'
                                    register={register}
                                    name='card.cvc'
                                    error={errors.card?.cvc?.message}
                                    maxLength={3}
                                    onChangeOverride={(e) => {
                                        e.target.value = e.target.value.replace(
                                            /\D/g,
                                            ''
                                        )
                                    }}
                                />
                            </label>
                        </div>
                    </div>
                ) : (
                    // SI ELEGIMOS BANCO
                    <div className='flex flex-col gap-2'>
                        {/* NOMBRE DEL PROPIETARIO */}
                        <label className='flex flex-col gap-1'>
                            <InputCheckout
                                label='Nombre de Propietario'
                                type='text'
                                register={register}
                                name='bank.nameAccount'
                                error={errors.bank?.nameAccount?.message}
                            />
                        </label>

                        {/* NUMERO DE LA CUENTA BANCARIA */}
                        <label className='flex flex-col gap-1'>
                            <InputCheckout
                                label='Cuenta Bancaria'
                                type='text'
                                register={register}
                                name='bank.accountNumber'
                                error={errors.bank?.accountNumber?.message}
                                maxLength={10}
                                onChangeOverride={(e) => {
                                    e.target.value = e.target.value.replace(
                                        /\D/g,
                                        ''
                                    )
                                }}
                            />
                        </label>
                    </div>
                )}

                {/* INFORMACION DE PAGO */}
                <InfoPayment />
            </section>
        </form>
    )
}
