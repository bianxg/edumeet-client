import LinearProgress from '@mui/material/LinearProgress';
import { useContext, useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { ServiceContext } from '../../store/store';
import { VolumeWatcher } from '../../utils/volumeWatcher';

// TEST
/* eslint-disable */
import { Logger } from '../../utils/Logger';
const logger = new Logger('MicVolume');

const MicVolume = (): JSX.Element => {
	const micEnabled = useAppSelector((state) => state.me.micEnabled);
	const { mediaService } = useContext(ServiceContext);
	const [ volumeLevel, setVolume ] = useState<number>(0);

	useEffect(() => {
		let volumeWatcher: VolumeWatcher | undefined;

		if (micEnabled)
			volumeWatcher = mediaService.mediaSenders['mic'].volumeWatcher;

		logger.debug(`micEnabled:${micEnabled}`);
		logger.debug(`volumeWatcher:${volumeWatcher}`);

		const onVolumeChange = ({ volume, scaledVolume }: { volume: number, scaledVolume: number }): void => {
			setVolume(scaledVolume*10); // 恢复范围 0-100
		};

		volumeWatcher?.on('volumeChange', onVolumeChange);

		return () => {
			volumeWatcher?.off('volumeChange', onVolumeChange);
		};
	}, []);

	return (
		<LinearProgress color='success' variant="determinate" value={volumeLevel} />
	);
};

export default MicVolume;
