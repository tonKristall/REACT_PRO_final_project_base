import { WithProtection, SignInForm } from '../../../features/auth';

export const SignInPage = WithProtection(() => {
	return <SignInForm />;
});
