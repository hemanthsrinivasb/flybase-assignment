import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Radio, Bell, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Components
import IncidentAlert from '../components/phase1-alert/IncidentAlert';
import CommandMap from '../components/phase2-response/CommandMap';
import EvidencePreview from '../components/phase3-evidence/EvidencePreview';

type Phase = 'MONITORING' | 'ALERT' | 'RESPONSE' | 'EVIDENCE';

function Dashboard() {
    const [phase, setPhase] = useState<Phase>('MONITORING');
    const [time, setTime] = useState(new Date("2026-01-03T02:34:00"));
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Simulation Timer
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(t => new Date(t.getTime() + 1000));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Simulation Logic
    useEffect(() => {
        if (phase === 'MONITORING') {
            const timer = setTimeout(() => {
                setPhase('ALERT');
            }, 3000); // Trigger alert after 3s
            return () => clearTimeout(timer);
        }
    }, [phase]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="h-screen w-screen bg-flyt-950 text-white flex flex-col font-sans overflow-hidden bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop')] bg-cover bg-blend-overlay bg-black/80">

            {/* Top Navigation Bar */}
            <header className="h-14 border-b border-white/10 backdrop-blur-md flex items-center justify-between px-6 z-50 bg-black/40">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-flyt-500 font-bold text-xl tracking-tighter">
                        <ShieldCheck className="w-6 h-6" />
                        <span>FLYTBASE</span>
                    </div>
                    <div className="h-6 w-px bg-white/20 mx-2" />
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                        <span className={cn("inline-block w-2 h-2 rounded-full", phase === 'MONITORING' ? "bg-green-500 animate-pulse" : "bg-red-500 animate-pulse")} />
                        {phase === 'MONITORING' ? 'SYSTEM ACTIVE' : 'INCIDENT ACTIVE'}
                    </div>
                </div>

                <div className="text-2xl font-mono font-medium tracking-widest text-white/90">
                    {time.toLocaleTimeString('en-US', { hour12: false })}
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors relative">
                        <Bell className="w-5 h-5 text-gray-300" />
                        {phase !== 'MONITORING' && (
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                        )}
                    </button>

                    <div className="flex items-center gap-2 pl-4 border-l border-white/10">
                        <div className="flex flex-col items-end mr-2">
                            <span className="text-sm font-bold text-white">{user?.name || 'Operator'}</span>
                            <span className="text-[10px] text-gray-400 uppercase tracking-widest">Command Lvl 5</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-2 hover:bg-red-500/20 rounded-full text-gray-400 hover:text-red-400 transition-colors"
                            title="Logout"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 relative overflow-hidden">
                <AnimatePresence mode="wait">
                    {phase === 'MONITORING' && (
                        <motion.div
                            key="monitoring"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="h-full flex items-center justify-center flex-col gap-6"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-flyt-500/20 blur-3xl rounded-full" />
                                <ShieldCheck className="w-32 h-32 text-flyt-500 relative z-10" />
                            </div>
                            <h2 className="text-2xl font-light tracking-wide text-gray-300">All Systems Nominal. Monitoring 12 Sites.</h2>
                        </motion.div>
                    )}

                    {phase === 'ALERT' && (
                        <motion.div
                            key="alert"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="h-full w-full p-6 flex items-center justify-center backdrop-blur-sm bg-black/40 overflow-y-auto"
                        >
                            <IncidentAlert onDeploy={() => setPhase('RESPONSE')} />
                        </motion.div>
                    )}

                    {phase === 'RESPONSE' && (
                        <motion.div
                            key="response"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="h-full w-full flex flex-col"
                        >
                            <CommandMap onEndIncident={() => setPhase('EVIDENCE')} />
                        </motion.div>
                    )}

                    {phase === 'EVIDENCE' && (
                        <motion.div
                            key="evidence"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="h-full w-full p-6 bg-black/80 backdrop-blur-xl"
                        >
                            <EvidencePreview onReset={() => setPhase('MONITORING')} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Bottom Status / Control Bar (Visible in Response) */}
            {phase === 'RESPONSE' && (
                <motion.div
                    initial={{ y: 100 }} animate={{ y: 0 }}
                    className="h-16 border-t border-white/10 bg-black/60 backdrop-blur-xl px-6 flex items-center justify-between"
                >
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Drone Status</span>
                            <div className="flex items-center gap-2 text-flyt-accent">
                                <Radio className="w-4 h-4 animate-pulse" />
                                <span className="font-mono text-sm">3 UNITS ACTIVE</span>
                            </div>
                        </div>
                        <div className="h-8 w-px bg-white/10" />
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">AI Confidence</span>
                            <span className="font-mono text-sm text-green-400">98.4% CONFIRMED</span>
                        </div>
                    </div>

                    <button
                        onClick={() => setPhase('EVIDENCE')}
                        className="bg-flyt-alert/20 hover:bg-flyt-alert/30 text-flyt-alert border border-flyt-alert/50 px-4 py-2 rounded-md uppercase text-xs font-bold tracking-widest transition-all"
                    >
                        De-escalate & Report
                    </button>
                </motion.div>
            )}

        </div>
    );
}

export default Dashboard;
