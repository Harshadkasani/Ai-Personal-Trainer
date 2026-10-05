import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Profile() {
  const p = useSelector((s) => s.profile.data);
  const rows = [['Name', p.name], ['Age', p.age], ['Gender', p.gender], ['Height', `${p.height} cm`], ['Weight', `${p.weight} kg`], ['Goal', p.goal], ['Experience', p.experience],
    ['Days / week', p.days], ['Duration', `${p.duration} min`], ['Equipment', p.equipment], ['Injuries', p.injuries || 'None']];
  return (
    <>
      <div className="row-between"><h1>Your Profile</h1><Link className="btn" to="/setup">Edit & regenerate plan</Link></div>
      <div className="card"><dl className="dl">{rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl></div>
    </>
  );
}
