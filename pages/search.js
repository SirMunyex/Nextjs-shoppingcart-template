import { useRouter } from 'next/router'

export default function search(){
    
    const router = useRouter()
    const {product}  = router.query;
    
    return(
        <h1>Product #{product}</h1>
    )
}