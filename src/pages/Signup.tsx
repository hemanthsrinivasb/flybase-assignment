import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, UserPlus, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setError("All fields are required for access.");
            return;
        }

        // Auto-login after signup
        login(email, name);
        navigate('/dashboard');
    };

    return (
        <div className="h-screen w-screen bg-flyt-950 flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop')] bg-cover bg-blend-overlay bg-black/80">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md p-8 bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl relative overflow-hidden"
            >
                {/* Decorative background element */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-flyt-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col items-center mb-8 relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-flyt-500 to-purple-600 rounded-full flex items-center justify-center mb-4 text-white shadow-lg shadow-flyt-500/20">
                        <UserPlus className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Request Access</h1>
                    <p className="text-gray-400 mt-2">Initialize new operator profile</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm font-medium text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Full Name</label>
                        <input
                            type="text"
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-flyt-500 transition-colors"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Email Address</label>
                        <input
                            type="email"
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-flyt-500 transition-colors"
                            placeholder="operator@flytbase.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Password</label>
                        <input
                            type="password"
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-flyt-500 transition-colors"
                            placeholder="Create a strong password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="bg-flyt-accent/10 border border-flyt-accent/20 p-3 rounded-lg flex items-center gap-3">
                        <Zap className="w-5 h-5 text-flyt-accent" />
                        <div className="text-xs text-gray-300">
                            <strong>AI-Native Experience:</strong> High-fidelity tactical simulations are enabled by default for all new accounts.
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-flyt-500 hover:bg-flyt-600 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-flyt-500/25 mt-4"
                    >
                        <ShieldCheck className="w-4 h-4" />
                        Create Account
                    </button>

                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-400">
                            Already have credentials?{' '}
                            <Link to="/login" className="text-flyt-accent hover:text-white transition-colors font-medium">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Signup;
