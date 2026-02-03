
import React from 'react';
import { ML_STEPS } from '../constants';

const MLProcess: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mt-12">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">How Machine Learning Detects Spam</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ML_STEPS.map((step, idx) => (
          <div key={idx} className="p-5 rounded-xl bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold">
                {idx + 1}
              </span>
              <h3 className="font-semibold text-slate-800">{step.title}</h3>
            </div>
            <p className="text-sm text-slate-600 mb-2">{step.desc}</p>
            <code className="text-xs bg-white p-2 rounded block border border-slate-200 text-blue-600 font-mono">
              {step.details}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MLProcess;
