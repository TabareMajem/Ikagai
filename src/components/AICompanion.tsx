import React from 'react';
import { Bot } from 'lucide-react';

export default function AICompanion() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="bg-indigo-100 p-3 rounded-full">
          <Bot className="w-8 h-8 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-lg font-medium text-gray-800">こんにちは、田中さん！</h2>
          <p className="text-gray-600 mt-1">
            今日も一緒に素敵な一日を過ごしましょう。
            <br />
            新しいストーリークエストが待っています。
          </p>
        </div>
      </div>
    </div>
  );
}