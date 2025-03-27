import { z } from 'zod'

const cardSchema = z
    .object({
        name: z.string().min(3, 'El nombre es obligatorio'),
        number: z
            .string()
            .min(19, 'El numero de la tarjeta debe tener 16 digitos')
            .max(19, 'El numero de la tarjeta debe tener 16 digitos'),
        expiration: z
            .string()
            .regex(
                /^(0[1-9]|1[0-2])\/\d{2}$/,
                'La fecha de expiración debe tener el formato MM/YY'
            ),
        cvc: z
            .string()
            .min(3, 'El CVV debe tener 3 digitos')
            .max(4, 'El CVV debe tener 3 digitos'),
    })
    .optional()

const bankSchema = z
    .object({
        nameAccount: z.string().min(3, 'El nombre es obligatorio'),
        accountNumber: z
            .string()
            .min(10, 'El numero de cuenta debe tener 10 digitos'),
    })
    .optional()

export const checkoutSchema = z
    .object({
        email: z.string().email('El email no es valido'),
        paymentMethod: z.enum(['card', 'bank'], {
            required_error: 'El metodo de pago es obligatorio',
        }),
        delivery: z.enum(['free', 'express'], {
            required_error: 'El metodo de envio es obligatorio',
        }),
        card: cardSchema,
        bank: bankSchema,
    })
    .refine(
        //VALIDAMOS QUE LOS DATOS NO ESTEN VACIOS Y DEVOLVEMOS UN BOOLEAN
        (data) => {
            if (data.paymentMethod === 'card') {
                return (
                    !!data.card?.name &&
                    !!data.card?.number &&
                    !!data.card?.expiration &&
                    !!data.card?.cvc
                )
            }

            if (data.paymentMethod === 'bank') {
                return !!data.bank?.nameAccount && !!data.bank?.accountNumber
            }
        },
        {
            message: 'Debe completar los datos del metodo de pago seleccionado',
            path: ['paymentMethod'],
        }
    )
