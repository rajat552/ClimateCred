import { create } from 'zustand';
export const PRESET_USERS = {
    credit_officer: {
        id: 'usr-001',
        name: 'Rohan Sharma',
        email: 'rohan.sharma@nbfc-bank.com',
        role: 'credit_officer',
        roleTitle: 'Credit Underwriting Officer',
        badge: 'Underwriting Lead',
        avatarInitial: 'RS',
        avatarGradient: 'from-emerald-500 to-teal-600',
        permissions: ['View Cases', 'Execute Sanctions', 'Simulate Stress Scenarios', 'Generate CAM Memos'],
    },
    risk_manager: {
        id: 'usr-002',
        name: 'Priya Patel',
        email: 'priya.patel@risk-control.com',
        role: 'risk_manager',
        roleTitle: 'Chief Risk Officer',
        badge: 'Risk & Covenants',
        avatarInitial: 'PP',
        avatarGradient: 'from-blue-500 to-indigo-600',
        permissions: ['Portfolio Stress Testing', 'Covenant Overrides', 'Model Calibration', 'Loss Given Default Limits'],
    },
    auditor: {
        id: 'usr-003',
        name: 'Dr. Amit Verma',
        email: 'amit.verma@esg-auditors.org',
        role: 'auditor',
        roleTitle: 'ESG & Compliance Auditor',
        badge: 'Regulatory Audit',
        avatarInitial: 'AV',
        avatarGradient: 'from-purple-500 to-pink-600',
        permissions: ['Cryptographic Audit Ledger', 'ISO 14091 Proofs', 'SEBI BRSR Export', 'Evidence Hash Verification'],
    },
    admin: {
        id: 'usr-004',
        name: 'Vikram Mehra',
        email: 'vikram.mehra@climatetwin.io',
        role: 'admin',
        roleTitle: 'Executive Portfolio Admin',
        badge: 'System Admin',
        avatarInitial: 'VM',
        avatarGradient: 'from-amber-500 to-orange-600',
        permissions: ['Full Access', 'User Management', 'Subvention Rate Config', 'API Key Management'],
    },
};
const getInitialUser = () => {
    const saved = localStorage.getItem('climatetwin_active_role');
    return PRESET_USERS[saved] || PRESET_USERS.credit_officer;
};
export const useAuthStore = create((set) => ({
    currentUser: getInitialUser(),
    isAuthenticated: true,
    loginAsRole: (role) => {
        const user = PRESET_USERS[role] || PRESET_USERS.credit_officer;
        localStorage.setItem('climatetwin_active_role', role);
        set({ currentUser: user, isAuthenticated: true });
    },
    logout: () => {
        localStorage.removeItem('climatetwin_active_role');
        set({ currentUser: PRESET_USERS.credit_officer, isAuthenticated: false });
    },
}));
//# sourceMappingURL=authStore.js.map