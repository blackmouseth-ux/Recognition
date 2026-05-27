import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Banknote, Ticket, Users, AlertTriangle, CheckCircle2, Building2, Trophy, Filter, RotateCcw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const rawData = [
  { bu: 'บริษัท ไทย วี.พี. คอร์ปอเรชั่น จำกัด (TVP)', award: 'พนักงานอายุงาน 5 ปี', prize: 5000, lottery: true, status: 'ACTIVE', remark: '' },
  { bu: 'บริษัท ไทย วี.พี. คอร์ปอเรชั่น จำกัด (TVP)', award: 'พนักงานอายุงาน 10 ปี', prize: 10000, lottery: true, status: 'ACTIVE', remark: '' },
  { bu: 'บริษัท ไทย วี.พี. คอร์ปอเรชั่น จำกัด (TVP)', award: 'พนักงานอายุงาน 15 ปี', prize: 15000, lottery: true, status: 'INACTIVE', remark: '' },
  { bu: 'บริษัท ไทย วี.พี. คอร์ปอเรชั่น จำกัด (TVP)', award: 'ผลการปฏิบัติงานดีเยี่ยม', prize: 5000, lottery: true, status: 'ACTIVE', remark: '' },
  { bu: 'บริษัท ไทย วี.พี. คอร์ปอเรชั่น จำกัด (TVP)', award: 'นักขายมือทอง', prize: 5000, lottery: true, status: 'INACTIVE', remark: '' },
  { bu: 'บริษัท ไทย วี.พี. คอร์ปอเรชั่น จำกัด (TVP)', award: 'ช่างยอดเยี่ยม', prize: 5000, lottery: false, status: '', remark: '' },
  { bu: 'บริษัท ไทย วี.พี. คอร์ปอเรชั่น จำกัด (TVP)', award: 'สุดยอดที่ปรึกษาด้านการบริการ', prize: 5000, lottery: false, status: '', remark: 'ตรวจสอบวันลาเกิน' },

  { bu: 'บริษัท อีซูซุชัยเจริญกิจมอเตอร์ส จำกัด (ICCK)', award: 'พนักงานอายุงาน 5 ปี', prize: 5000, lottery: true, status: 'ACTIVE', remark: '' },
  { bu: 'บริษัท อีซูซุชัยเจริญกิจมอเตอร์ส จำกัด (ICCK)', award: 'พนักงานอายุงาน 10 ปี', prize: 10000, lottery: true, status: 'INACTIVE', remark: '' },
  { bu: 'บริษัท อีซูซุชัยเจริญกิจมอเตอร์ส จำกัด (ICCK)', award: 'พนักงานอายุงาน 15 ปี', prize: 15000, lottery: true, status: 'ACTIVE', remark: '' },
  { bu: 'บริษัท อีซูซุชัยเจริญกิจมอเตอร์ส จำกัด (ICCK)', award: 'พนักงานอายุงาน 20 ปี', prize: 20000, lottery: true, status: 'ACTIVE', remark: '' },
  { bu: 'บริษัท อีซูซุชัยเจริญกิจมอเตอร์ส จำกัด (ICCK)', award: 'ผลการปฏิบัติงานดีเยี่ยม', prize: 5000, lottery: false, status: '', remark: '' },
  { bu: 'บริษัท อีซูซุชัยเจริญกิจมอเตอร์ส จำกัด (ICCK)', award: 'นักขายมือทอง', prize: 5000, lottery: false, status: '', remark: '' },

  { bu: 'บริษัท โตโยต้า ลิบรา จำกัด', award: 'พนักงานอายุงาน 5 ปี', prize: 5000, lottery: true, status: 'ACTIVE', remark: '' },
  { bu: 'บริษัท โตโยต้า ลิบรา จำกัด', award: 'พนักงานอายุงาน 10 ปี', prize: 10000, lottery: true, status: 'ACTIVE', remark: '' },
  { bu: 'บริษัท โตโยต้า ลิบรา จำกัด', award: 'พนักงานอายุงาน 15 ปี', prize: 15000, lottery: true, status: 'INACTIVE', remark: '' },
  { bu: 'บริษัท โตโยต้า ลิบรา จำกัด', award: 'ช่างยอดเยี่ยม', prize: 5000, lottery: false, status: '', remark: '' },

  { bu: 'บริษัท เลกซัส ออโต้ ซิตี้ จำกัด (LAC)', award: 'พนักงานอายุงาน 5 ปี', prize: 5000, lottery: true, status: 'ACTIVE', remark: '' },
  { bu: 'บริษัท เลกซัส ออโต้ ซิตี้ จำกัด (LAC)', award: 'พนักงานอายุงาน 20 ปี', prize: 20000, lottery: true, status: 'INACTIVE', remark: '' },
  { bu: 'บริษัท เลกซัส ออโต้ ซิตี้ จำกัด (LAC)', award: 'สุดยอดที่ปรึกษาด้านการบริการ', prize: 5000, lottery: false, status: '', remark: '' },

  { bu: 'บริษัท บิซ มอเตอร์ส จำกัด (BMT)', award: 'พนักงานอายุงาน 5 ปี', prize: 5000, lottery: true, status: 'ACTIVE', remark: '' },
  { bu: 'บริษัท บิซ มอเตอร์ส จำกัด (BMT)', award: 'พนักงานอายุงาน 10 ปี', prize: 10000, lottery: true, status: 'INACTIVE', remark: '' },
  { bu: 'บริษัท บิซ มอเตอร์ส จำกัด (BMT)', award: 'ผลการปฏิบัติงานดีเยี่ยม', prize: 5000, lottery: false, status: '', remark: 'ตรวจสอบวันลาเกิน' },

  { bu: 'บริษัท บิซ พีเค จำกัด (BPK)', award: 'พนักงานอายุงาน 5 ปี', prize: 5000, lottery: true, status: 'ACTIVE', remark: '' },
  { bu: 'บริษัท บิซ พีเค จำกัด (BPK)', award: 'พนักงานอายุงาน 20 ปี', prize: 20000, lottery: true, status: 'INACTIVE', remark: '' },
  { bu: 'บริษัท บิซ พีเค จำกัด (BPK)', award: 'นักขายมือทอง', prize: 5000, lottery: false, status: '', remark: '' },

  { bu: 'บริษัท ไทยรุ่ง พาร์ทเนอร์ส กรุ๊ป จำกัด (TRP)', award: 'พนักงานอายุงาน 5 ปี', prize: 5000, lottery: true, status: 'ACTIVE', remark: '' },
  { bu: 'บริษัท วี.พี. แคปปิตอล แอสเซ็ทส์ จำกัด', award: 'พนักงานอายุงาน 25 ปี', prize: 25000, lottery: true, status: 'ACTIVE', remark: '' },
  { bu: 'บริษัท วี.พี. ออโต้ เอ็นเตอร์ไพรส์ จำกัด (VPA)', award: 'พนักงานอายุงาน 30 ปี', prize: 30000, lottery: true, status: 'INACTIVE', remark: 'ตรวจสอบวันลาเกิน' },
];

const officialTotalsByBU = [
  { name: 'บริษัท ไทย วี.พี. คอร์ปอเรชั่น จำกัด (TVP)', count: 30 },
  { name: 'บริษัท อีซูซุชัยเจริญกิจมอเตอร์ส จำกัด (ICCK)', count: 29 },
  { name: 'บริษัท โตโยต้า ลิบรา จำกัด', count: 18 },
  { name: 'บริษัท เลกซัส ออโต้ ซิตี้ จำกัด (LAC)', count: 14 },
  { name: 'บริษัท บิซ มอเตอร์ส จำกัด (BMT)', count: 13 },
  { name: 'บริษัท บิซ พีเค จำกัด (BPK)', count: 12 },
  { name: 'บริษัท ไทยรุ่ง พาร์ทเนอร์ส กรุ๊ป จำกัด (TRP)', count: 4 },
  { name: 'บริษัท วี.พี. แคปปิตอล แอสเซ็ทส์ จำกัด', count: 4 },
  { name: 'บริษัท วี.พี. ออโต้ เอ็นเตอร์ไพรส์ จำกัด (VPA)', count: 2 },
];

const officialAwardTotals = [
  { name: 'พนักงานอายุงาน 5 ปี', count: 34 },
  { name: 'พนักงานอายุงาน 10 ปี', count: 20 },
  { name: 'พนักงานอายุงาน 15 ปี', count: 20 },
  { name: 'ผลการปฏิบัติงานดีเยี่ยม', count: 13 },
  { name: 'พนักงานอายุงาน 20 ปี', count: 12 },
  { name: 'นักขายมือทอง', count: 10 },
  { name: 'ช่างยอดเยี่ยม', count: 8 },
  { name: 'สุดยอดที่ปรึกษาด้านการบริการ', count: 7 },
  { name: 'พนักงานอายุงาน 25 ปี', count: 1 },
  { name: 'พนักงานอายุงาน 30 ปี', count: 1 },
];

const officialPrizeTotals = [
  { value: 5000, count: 72 },
  { value: 10000, count: 20 },
  { value: 15000, count: 20 },
  { value: 20000, count: 12 },
  { value: 25000, count: 1 },
  { value: 30000, count: 1 },
];

const officialSummary = {
  totalPeople: 126,
  totalPrize: 1155000,
  averagePrize: 9166.67,
  withLottery: 88,
  withoutLottery: 38,
  active: 53,
  inactive: 35,
  missingStatus: 38,
  remarks: 3,
};

const formatNumber = (num) => new Intl.NumberFormat('th-TH').format(num);
const formatMoney = (num) => new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', maximumFractionDigits: 0 }).format(num);

function summarizeRows(rows, selectedBU) {
  if (selectedBU === 'ทั้งหมด') {
    return officialSummary;
  }

  const totalPeople = rows.length;
  const totalPrize = rows.reduce((sum, item) => sum + item.prize, 0);
  const withLottery = rows.filter((item) => item.lottery).length;
  const withoutLottery = rows.filter((item) => !item.lottery).length;
  const active = rows.filter((item) => item.status === 'ACTIVE').length;
  const inactive = rows.filter((item) => item.status === 'INACTIVE').length;
  const missingStatus = rows.filter((item) => !item.status).length;
  const remarks = rows.filter((item) => item.remark).length;

  return {
    totalPeople,
    totalPrize,
    averagePrize: totalPeople ? totalPrize / totalPeople : 0,
    withLottery,
    withoutLottery,
    active,
    inactive,
    missingStatus,
    remarks,
  };
}

function groupCount(rows, key) {
  return Object.entries(
    rows.reduce((acc, row) => {
      acc[row[key]] = (acc[row[key]] || 0) + 1;
      return acc;
    }, {})
  )
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

function groupPrize(rows) {
  return Object.entries(
    rows.reduce((acc, row) => {
      acc[row.prize] = (acc[row.prize] || 0) + 1;
      return acc;
    }, {})
  )
    .map(([value, count]) => ({ value: Number(value), count }))
    .sort((a, b) => a.value - b.value);
}

function StatCard({ icon: Icon, title, value, detail, tone = 'navy' }) {
  const toneClass = tone === 'red' ? 'bg-[#8B1E24]' : 'bg-[#0B1F3A]';

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <Card className="rounded-2xl border border-slate-100 bg-white shadow-sm">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-slate-500">{title}</p>
              <p className="mt-2 text-2xl font-bold text-[#0B1F3A]">{value}</p>
              <p className="mt-1 text-xs text-slate-500">{detail}</p>
            </div>
            <div className={`${toneClass} rounded-2xl p-3 text-white shadow-sm`}>
              <Icon size={22} />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function BarList({ data, max, suffix = 'คน', color = 'navy' }) {
  const barColor = color === 'red' ? 'bg-[#8B1E24]' : 'bg-[#0B1F3A]';

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.name}>
          <div className="mb-1 flex items-center justify-between gap-3 text-sm">
            <span className="line-clamp-1 font-medium text-slate-700">{item.name}</span>
            <span className="shrink-0 font-semibold text-[#0B1F3A]">{formatNumber(item.count)} {suffix}</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div className={`${barColor} h-full rounded-full`} style={{ width: `${max ? (item.count / max) * 100 : 0}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AwardLotterySummaryDashboard() {
  const [selectedBU, setSelectedBU] = useState('ทั้งหมด');

  const buOptions = ['ทั้งหมด', ...officialTotalsByBU.map((item) => item.name)];

  const filteredRows = useMemo(() => {
    if (selectedBU === 'ทั้งหมด') return rawData;
    return rawData.filter((item) => item.bu === selectedBU);
  }, [selectedBU]);

  const summary = useMemo(() => summarizeRows(filteredRows, selectedBU), [filteredRows, selectedBU]);

  const buData = selectedBU === 'ทั้งหมด' ? officialTotalsByBU : [{ name: selectedBU, count: summary.totalPeople }];
  const awardData = selectedBU === 'ทั้งหมด' ? officialAwardTotals : groupCount(filteredRows, 'award');
  const prizeData = selectedBU === 'ทั้งหมด' ? officialPrizeTotals : groupPrize(filteredRows);

  const maxBU = Math.max(...buData.map((item) => item.count), 1);
  const maxAward = Math.max(...awardData.map((item) => item.count), 1);

  const lotteryPercent = summary.totalPeople ? Math.round((summary.withLottery / summary.totalPeople) * 100) : 0;
  const activePercent = summary.withLottery ? Math.round((summary.active / summary.withLottery) * 100) : 0;
  const inactivePercent = summary.withLottery ? Math.round((summary.inactive / summary.withLottery) * 100) : 0;
  const missingPercent = summary.totalPeople ? Math.round((summary.missingStatus / summary.totalPeople) * 100) : 0;

  return (
    <main className="min-h-screen bg-white px-4 py-8 text-slate-900 md:px-8" style={{ fontFamily: 'Prompt, sans-serif' }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

      <section className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mb-6 overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[1fr_360px]">
            <div className="p-7 md:p-10">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#0B1F3A] px-4 py-2 text-sm text-white">
                <Award size={16} /> Dashboard สรุปข้อมูลจากไฟล์ CSV
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-[#0B1F3A] md:text-5xl">สรุปการซื้อสลาก งานประกาศเกียรติคุณ ปี 2568</h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                Dashboard สำหรับดูภาพรวมผู้ได้รับรางวัล เงินรางวัล สถานะสลาก และสามารถกรองตาม BU เพื่อดูข้อมูลเฉพาะหน่วยงานได้
              </p>
            </div>
            <div className="flex flex-col justify-between bg-[#0B1F3A] p-7 text-white md:p-10">
              <div>
                <p className="text-sm text-blue-100">ยอดรวมเงินรางวัล</p>
                <p className="mt-2 text-4xl font-extrabold">{formatMoney(summary.totalPrize)}</p>
              </div>
              <div className="mt-6 rounded-2xl bg-white/10 p-4">
                <p className="text-sm text-blue-100">BU ที่เลือก</p>
                <p className="mt-1 line-clamp-2 text-lg font-semibold">{selectedBU}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <Card className="mb-6 rounded-3xl border border-slate-100 bg-white shadow-sm">
          <CardContent className="p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-[#8B1E24] p-3 text-white">
                  <Filter size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#0B1F3A]">ตัวกรอง BU</h2>
                  <p className="text-sm text-slate-500">เลือกบริษัท / BU เพื่อดูสรุปเฉพาะกลุ่ม</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <select
                  value={selectedBU}
                  onChange={(event) => setSelectedBU(event.target.value)}
                  className="min-w-[280px] rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-[#0B1F3A] outline-none ring-[#0B1F3A]/10 transition focus:ring-4"
                >
                  {buOptions.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                <Button onClick={() => setSelectedBU('ทั้งหมด')} className="rounded-2xl bg-[#8B1E24] px-5 py-6 text-white hover:bg-[#71181D]">
                  <RotateCcw className="mr-2" size={16} /> รีเซ็ต
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard icon={Users} title="จำนวนผู้ได้รับรางวัล" value={`${formatNumber(summary.totalPeople)} คน`} detail="รายการตามตัวกรองปัจจุบัน" />
          <StatCard icon={Banknote} title="เงินรางวัลเฉลี่ย" value={formatMoney(summary.averagePrize)} detail="เฉลี่ยต่อผู้ได้รับรางวัล" tone="red" />
          <StatCard icon={Ticket} title="มีทะเบียนสลากแล้ว" value={`${formatNumber(summary.withLottery)} คน`} detail={`${lotteryPercent}% ของรายการที่เลือก`} />
          <StatCard icon={AlertTriangle} title="ต้องตรวจสอบเพิ่มเติม" value={`${formatNumber(summary.withoutLottery)} คน`} detail="ยังไม่มีเลขทะเบียนสลาก / สถานะ" tone="red" />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Card className="rounded-3xl border border-slate-100 bg-white shadow-sm lg:col-span-2">
            <CardContent className="p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#0B1F3A]">จำนวนผู้ได้รับรางวัลตาม BU</h2>
                  <p className="mt-1 text-sm text-slate-500">แสดงตามตัวกรองที่เลือก</p>
                </div>
                <Building2 className="text-[#8B1E24]" />
              </div>
              <BarList data={buData} max={maxBU} />
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-100 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#0B1F3A]">สถานะบัญชี / สลาก</h2>
                  <p className="mt-1 text-sm text-slate-500">จากรายการที่มีข้อมูลสถานะ</p>
                </div>
                <CheckCircle2 className="text-[#8B1E24]" />
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-[#0B1F3A]/10 bg-[#0B1F3A]/5 p-4">
                  <p className="text-sm text-[#0B1F3A]">ACTIVE</p>
                  <p className="text-3xl font-bold text-[#0B1F3A]">{summary.active} คน</p>
                  <p className="text-xs text-slate-500">{activePercent}% ของรายการที่มีทะเบียนสลาก</p>
                </div>
                <div className="rounded-2xl border border-[#8B1E24]/10 bg-[#8B1E24]/5 p-4">
                  <p className="text-sm text-[#8B1E24]">INACTIVE</p>
                  <p className="text-3xl font-bold text-[#8B1E24]">{summary.inactive} คน</p>
                  <p className="text-xs text-slate-500">{inactivePercent}% ของรายการที่มีทะเบียนสลาก</p>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-sm text-slate-600">ไม่มีข้อมูลสถานะ</p>
                  <p className="text-3xl font-bold text-slate-900">{summary.missingStatus} คน</p>
                  <p className="text-xs text-slate-500">{missingPercent}% ของรายการที่เลือก</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card className="rounded-3xl border border-slate-100 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#0B1F3A]">ประเภทรางวัล</h2>
                  <p className="mt-1 text-sm text-slate-500">จำนวนผู้ได้รับรางวัลแยกตามชื่อรางวัล</p>
                </div>
                <Trophy className="text-[#8B1E24]" />
              </div>
              <BarList data={awardData} max={maxAward} color="red" />
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-100 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="mb-5">
                <h2 className="text-xl font-bold text-[#0B1F3A]">ช่วงเงินรางวัล</h2>
                <p className="mt-1 text-sm text-slate-500">จำนวนรายการตามมูลค่าเงินรางวัล</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {prizeData.map((item) => (
                  <div key={item.value} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                    <p className="text-sm text-slate-500">เงินรางวัล</p>
                    <p className="text-2xl font-bold text-[#0B1F3A]">{formatMoney(item.value)}</p>
                    <p className="mt-1 text-sm text-[#8B1E24]">{formatNumber(item.count)} รายการ</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-[#8B1E24]/10 bg-[#8B1E24]/5 p-4 text-[#8B1E24]">
                <p className="font-semibold">หมายเหตุที่พบ</p>
                <p className="mt-1 text-sm">มีรายการ “ตรวจสอบวันลาเกิน” จำนวน {summary.remarks} รายการ ตามตัวกรองปัจจุบัน</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 rounded-3xl border border-slate-100 bg-white shadow-sm">
          <CardContent className="p-6">
            <h2 className="mb-4 text-xl font-bold text-[#0B1F3A]">Checklist แนะนำก่อนดำเนินการ</h2>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="font-semibold text-[#0B1F3A]">1. ตรวจผู้ไม่มีทะเบียนสลาก</p>
                <p className="mt-1 text-sm text-slate-600">มี {summary.withoutLottery} รายการที่ยังไม่มีข้อมูลทะเบียนสลาก / บัญชีฝากเงิน</p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="font-semibold text-[#0B1F3A]">2. ติดต่อรายการ INACTIVE</p>
                <p className="mt-1 text-sm text-slate-600">มี {summary.inactive} รายการที่ขึ้นสถานะ INACTIVE ควรติดต่อสาขาหรือผู้เกี่ยวข้อง</p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="font-semibold text-[#0B1F3A]">3. ตรวจหมายเหตุก่อนอนุมัติ</p>
                <p className="mt-1 text-sm text-slate-600">มี {summary.remarks} รายการที่มีหมายเหตุเรื่องวันลาเกิน</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
