---
title: "Ich Habe Meine Daten Gesichert"
date: 2023-01-25T02:44:56+02:00
tags: ["german"]
---

Dieser Artikel ist auf Deutch.
Ich bin kein Muttersprachler, also bitte verzeih mir bitte meine Fehler.
Das ist meine Art, zu üben!

# Was Ich Will

Um den Kontext zu verdeutlichen: Hier geht es um die Sicherung von Dateien unter Arch Linux.

Mein Laptop hat eine 2TB SSD (wovon 1TB wichtig ist).

Ich habe auch eine externe Festplatte mit 1 TB, die ich für Sicherungskopien verwenden möchte.

# Die 3-2-1-Regel

Es gibt einen beliebten Ratschlag, wenn es um Dateisicherungen geht:

1. man sollte drei Kopien seiner Dateien haben
2. auf zwei verschiedenen Geräten
3. und eines davon sollte außerhalb des Standorts sein

Ich habe auch meine eigenen Regeln:

4. wenn ich versehentlich etwas lösche, sollte ich in der Lage sein, das es zu retten
5. wenn meine Festplatte explodiert, sollte ich in der Lage sein, das zu retten, was Wichtig ist
6. wenn mein Haus abbrennt, sollte ich in der Lage sein, das zu retten, was Nötig ist

# BTRFS

[Btrfs](https://wiki.archlinux.org/title/Btrfs) ist ein Dateisystem. Es gehört zur gleichen Kategorie wie `NTFS`, `FAT32`, oder `ext4`.
Was es von anderen unterscheidet ist {{% abbr "Copy-on-Write" %}}CoW{{% / abbr %}}.
Im Wesentlichen, das heißt, wenn eine Datei überschrieben wird, bleibt die ursprüngliche Kopie auf der Festplatte.
Mit Btrfs können wir diese Kopien in "Snapshots" speichern.

Ich werde bald eine eigene Cheatsheet-seite für BTRFS einrichten, aber fürs Erste habe ich den folgenden Befehl verwendet:
<!-- todo -->

```bash
mkfs.btrfs /dev/$partition
```

# Snapshots Erstellen

Snapshots in BTRFS zu erstellen ist eigentlich sehr einfach.
Man kann Timeshift verwenden, oder den folgenden Befehl:

```bash
btrfs subvolume snapshot -r /home /snapshots/$snapName
```

Die Option `-r` macht den Snapshot schreibgeschützt.

Ich habe ein gesondertes Subvolume für meine Home-Partition, daher muss ich es in dem Befehl angeben.

Timeshift ermöglicht periodische Snapshots, aber ich benutze den Befehl lieber manuell.

# Snapshots Kopieren

Sobald wir BTRFS auf beiden Geräten haben, können wir Snapshots von einem auf das andere Gerät kopieren.

Wenn die externe Festplatte unter /mnt liegt, lautet der Befehl:

```bash
btrfs send /snapshots/$snapName | btrfs receive /mnt
```


## Inkrementelle Snapshots

Wir wollen jedoch nicht alle Snapshots vollständig kopieren. Um nur das zu kopieren, was sich seit dem letzten gesicherten Snapshot geändert hat:

```bash
snapshot(){
	snapName=home-$(date +"%Y-%m-%d_%H-%M-%S")
	btrfs subvolume snapshot -r /home /snapshots/$snapName
	echo $snapName | tee /snapshots/newest
}

backupSnapshot(){
	latest=$(cat /snapshots/latest)
	newest=$(cat /snapshots/newest)
	btrfs send -p /snapshots/$latest /snapshots/$newest | btrfs receive /mnt
	echo "$newest" | tee /snapshots/latest
}
```

Bei dieser Methode werden zwei Dateien mit den Namen `newest` und `latest` verwendet.
In der ersten wird der Name des neuesten Snapshots gespeichert, in der zweiten der Name des zuletzt auf die externe Festplatte kopierten Snapshots.
Wir können dann den Unterschied zwischen diesen beiden kopieren.

# Encryption

<!-- todo -->
