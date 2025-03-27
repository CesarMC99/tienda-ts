import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import { StarRating } from './StarRating'
import { useState } from 'react'
import { Review } from '../../../types'
import { timeAgoFormatting } from '../../../helpers'

interface ReviewCommentProps {
    review: Review
}

export const ReviewComment = ({ review }: ReviewCommentProps) => {
    const [isLiked, setIsLiked] = useState({
        like: false,
        dislike: false,
    })

    return (
        <article className='flex flex-col gap-2 p-3 border-1 border-gray-300 rounded-md '>
            <h5 className='text-lg font-semibold'>{review.reviewerName}</h5>
            <div className='flex items-center gap-2'>
                {/* PUNTUACION EN MODO DE ESTRELLAS */}
                <StarRating
                    rating={review.rating}
                    size={2}
                />
                {/* FECHA DEL COMENTARIO */}
                <p className='text-sm text-gray-400'>
                    {timeAgoFormatting(review.date)}
                </p>
            </div>
            <p className=''>{review.comment}</p>
            <p className='text-sm text-gray-500'>
                {isLiked.like === true || isLiked.dislike === true
                    ? 'Gracias por tus comentarios'
                    : '¿Te ha resultado útil esta reseña?'}
            </p>
            {/* BOTONES DE LIKE Y DISLIKE */}
            <div className='flex gap-3'>
                {/* LIKE */}
                <div
                    className={` p-2 border-1  rounded-sm ${
                        isLiked.like
                            ? 'bg-gray-300 border-gray-500'
                            : 'bg-gray-100 border-gray-300'
                    }`}
                    onClick={() =>
                        setIsLiked((prevState) => ({
                            ...prevState,
                            like: !prevState.like,
                            dislike: false,
                        }))
                    }
                >
                    <AiOutlineLike />
                </div>

                {/* DISLIKE */}
                <div
                    className={` p-2 border-1  rounded-sm ${
                        isLiked.dislike
                            ? 'bg-gray-300 border-gray-500'
                            : 'bg-gray-100 border-gray-300'
                    }`}
                    onClick={() =>
                        setIsLiked((prevState) => ({
                            ...prevState,
                            like: false,
                            dislike: !prevState.dislike,
                        }))
                    }
                >
                    <AiOutlineDislike />
                </div>
            </div>
        </article>
    )
}
