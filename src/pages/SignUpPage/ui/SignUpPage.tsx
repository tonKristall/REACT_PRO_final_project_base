import { WithProtection, SignUpForm } from '../../../features/auth';

export const SignUpPage = WithProtection(() => {
	return <SignUpForm />;
});
