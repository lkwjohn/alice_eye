if ! mount | grep /mnt/alice_nas; then
    now=$(date +"%T")
    echo "######## Try to remount /mnt/alice_nas at $now#######"
    mount -a
fi