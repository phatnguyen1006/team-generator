import { useState } from 'react';
import { Col, Row } from 'antd';
import ListPlayer from './components/list-player.tsx';
import TeamSetting from './components/team-setting.tsx';
import GeneratedTeam from './components/generated-team.tsx';
import { Player, Team, TeamName } from '../../types';
import { generateTeams, generateTeamsV2 } from '../../utilities';
import { SettingsModal, settings } from './components/modal.tsx';

function Home() {
  const [selectedPlayer, setSelectedPlayer] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  function onSubmit(teamName: TeamName[]) {
    if (settings.randomAlgo) {
      console.log("[NEW] Random");
      const generatedTeams = generateTeamsV2(selectedPlayer, teamName);
      setTeams(generatedTeams);
    }
    else {
      console.log("[OLD] Random");
      const generatedTeams = generateTeams(selectedPlayer, teamName);
      setTeams(generatedTeams);
    }

  }

  function onSelectPlayer(obj: Player) {
    if (selectedPlayer.includes(obj)) {
      const tmpPlayer = selectedPlayer.filter(o => o.id !== obj.id);
      setSelectedPlayer(tmpPlayer);
    } else {
      setSelectedPlayer([...selectedPlayer, obj]);
    }
  }

  return (
    <div className='m-auto mb-[40px] w-[80vw] p-[16px]'>
      <div className='m-auto mb-[90px] w-[70vw]'>
        <GeneratedTeam items={teams} />
      </div>

      <Row gutter={16}>
        <Col span={12}>
          <ListPlayer selected={selectedPlayer} onSelect={onSelectPlayer} />
        </Col>
        <Col span={12}>
          <TeamSetting onSubmit={onSubmit} />
        </Col>
      </Row>
      <SettingsModal />
    </div>
  );
}

export default Home;
