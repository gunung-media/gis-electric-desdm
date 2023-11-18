import { GuestLayout } from "@/Layouts/GuestLayout";
import { PageProps } from "@/types";

export default function Login({ assets }: PageProps) {
    return (
        <GuestLayout>
            <form className="pt-3">
                <div className="form-group">
                    <label htmlFor="exampleInputEmail">Username</label>
                    <div className="input-group">
                        <div className="input-group-prepend bg-transparent">
                            <span className="input-group-text bg-transparent border-right-0">
                                <i className="ti-user text-primary"></i>
                            </span>
                        </div>
                        <input type="text" className="form-control form-control-lg border-left-0" id="exampleInputEmail" placeholder="Username" />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword">Password</label>
                    <div className="input-group">
                        <div className="input-group-prepend bg-transparent">
                            <span className="input-group-text bg-transparent border-right-0">
                                <i className="ti-lock text-primary"></i>
                            </span>
                        </div>
                        <input type="password" className="form-control form-control-lg border-left-0" id="exampleInputPassword" placeholder="Password" />
                    </div>
                </div>
                <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                        <label className="form-check-label text-muted">
                            <input type="checkbox" className="form-check-input" />
                            Keep me signed in
                        </label>
                    </div>
                    <a href="#" className="auth-link text-black">Forgot password?</a>
                </div>
                <div className="my-3">
                    <a className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" href="../../index.html">LOGIN</a>
                </div>
                <div className="mb-2 d-flex">
                    <button type="button" className="btn btn-facebook auth-form-btn flex-grow me-1">
                        <i className="ti-facebook me-2"></i>Facebook
                    </button>
                    <button type="button" className="btn btn-google auth-form-btn flex-grow ms-1">
                        <i className="ti-google me-2"></i>Google
                    </button>
                </div>
                <div className="text-center mt-4 font-weight-light">
                    Don't have an account? <a href="register-2.html" className="text-primary">Create</a>
                </div>
            </form>
        </GuestLayout>
    )
}
