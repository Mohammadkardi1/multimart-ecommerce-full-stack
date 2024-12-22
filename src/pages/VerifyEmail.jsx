import { useEffect } from "react"
import {  Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { verifyEmail } from './../redux/thunks/authThunks';
import LoadingModel from './../components/Model/LoadingModel';
import successImg from "../assets/images/success.png"
import failure from "../assets/images/failure.png"
import { showToastSuccess } from '../utils/toastUtils';



const VerifyEmail = () => {
	const param = useParams()
	const dispatch = useDispatch()

    const {isVerified, authError, authLoading} = useSelector((state) => state.auth)


	useEffect(() => {
		const verifyEmailAsync = async () => {
			try {
				const res = await dispatch(verifyEmail({ id: param.id, token: param.token }));
				if (!res.error) {
					showToastSuccess("You have registered successfully!", { position: "top-right", autoClose: 3000 });
				}
			} catch (error) {
				console.log(error);
			}
		}
	
        if (param.id && param.token) {
            verifyEmailAsync()
        }
	}, [param.id, param.token])


	if (authLoading) {
		return (
		<div className="flex justify-center items-center">
			<LoadingModel styles='h-[250px] w-[250px]'/>
		</div>
		)
	}

	return (
		<div className='w-full mt-12 flex flex-col items-center justify-center gap-6 plain-text text-textColor font-semibold'>
			{isVerified === true &&
				<>
					<img src={successImg} alt="success_img" className='w-[150px] lg:w-[250px]' />
					<h1>
						Email verified successfully! Please Log in.
						<Link to='/login' className=' text-primaryColor ml-2 underline'>
							Login
						</Link>
					</h1>
				</>
				}
				{isVerified === false &&
					<>
						<img src={failure} alt="failure_img" className='w-[150px] lg:w-[250px]' />
						<h1 className="plain-text text-center">
							{authError}
						</h1>
					</>
				}
		</div>
	)
}

export default VerifyEmail